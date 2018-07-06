// Load npm modules.
import * as Bluebird from 'bluebird'
import * as findConfig from 'find-config'
import * as moduleAlias from 'module-alias'

// Load node modules.
import * as path from 'path'

// Verify that the current directory contains a package configuration.
// TODO
// if () {
// }

// Load environment variables.
import 'dotenv/config'

// Find the project root.
const packageConfigPath = findConfig('package.json', { cwd: path.resolve(__dirname, '..') })
if (packageConfigPath === null) {
	throw new Error("Cannot find the project's package configuration.")
}

// Setup the module path alias.
moduleAlias.addAlias('...', path.dirname(packageConfigPath))

// Load bluebird as the global promise library.
global.Promise = Bluebird
