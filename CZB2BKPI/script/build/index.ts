// Load scoped modules.
import executePromise from '@player1os/execute-promise'

// Load npm modules.
import * as fse from 'fs-extra'
import * as recursiveReaddirSync from 'recursive-readdir-sync'
import spawnProcessPromise from 'spawn-process-promise'

// Load node modules.
import * as path from 'path'

executePromise(async () => {
	// Clear the build folder.
	await fse.remove(path.join(process.cwd(), path.join('.', 'build')))

	// Build the scripts using tsc.
	await spawnProcessPromise('tsc', [
		'-p', './tsconfig-create.json',
	], {
		shell: true,
		stdio: 'inherit',
	})

	// Rewrite the aliased relative paths.
	await spawnProcessPromise('ts-config-rewrite-paths', [
		path.join('.', 'build'), ['...', 'source', ''].join('/'), '.js',
	], {
		shell: true,
		stdio: 'inherit',
	})

	// Add implicit headers to the executable source files.
	await Promise.all(recursiveReaddirSync(path.join(process.cwd(), path.join('.', 'build')))
		.map(async (filePath) => {
			// Verify that the current file has the correct extension.
			if (path.extname(filePath) !== '.js') {
				return
			}

			const content = await fse.readFile(filePath, { encoding: 'utf-8' })
			const originalLength = content.length
			const lines = content.replace(/\r/g, '').split('\n')

			// Verify that the current file is an executable script.
			if (lines[0] !== '#!/usr/bin/env electron') {
				return
			}

			lines.splice(2, 0, ...[
				// Add support for dot env.
				"require('dotenv/config');",

				// Add support for source-maps.
				"require('source-map-support/register');",

				// Load bluebird as the global promise library.
				"global.Promise = require('bluebird');",
			])

			const lineDelimiter = originalLength > content.length
				? '\r\n'
				: '\n'
			await fse.writeFile(filePath, lines.join(lineDelimiter), { encoding: 'utf-8' })
		}))

	// Copy the html files.
	await fse.copy(path.join('.', 'source', 'html'), path.join('.', 'build', 'html'))

	// Copy the package file.

})

// Generate the package.json.
// - name
// - version
// - description
// - main
// - keywords
// - author
// - license
// - dependencies
