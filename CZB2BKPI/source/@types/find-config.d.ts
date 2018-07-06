declare module 'find-config' {
	const main: (path: string, options: { cwd: string }) => string | null
	export = main
}
