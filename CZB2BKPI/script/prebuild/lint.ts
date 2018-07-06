// import spawnProces

export const execute = async (
	excludedPaths: string[],
	projectFilePath: string,
): Promise<void> => {
	const commandArguments = ['**/*.ts']
	excludedPaths.forEach((excludedPath) => {
		commandArguments.push('-e', excludedPath)
	})
	commandArguments.push('-p', projectFilePath)
}

export class Watcher {
	public async start(): Promise<void> {
		console.log('x')
	}

	public async restart(): Promise<void> {
		console.log('x')
	}

	public async stop(): Promise<void> {
		console.log('x')
	}
}

export const executeWatch = () => {
	console.log('x')
}


'chokidar' [
	'package.json',
	'tsconfig.json',
	'tslint.json',
	'--initial',
	'--silent',
	'-c',
]   "tslint ./**/*.ts -e ./node_modules -p ./tsconfig.json && chokidar ./**/*.ts -i ./node_modules -c ""tslint {path} -p ./tsconfig.json"""
