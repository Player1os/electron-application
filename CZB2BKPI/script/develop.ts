
/*
1. check if 'build/package.json' file and current process exists:
	a. 'package.json' created/changed and current process does not exist: execute the main process
	b. 'package.json' created/changed and current process exists: restart the main process
	c. 'package.json' deleted and current process does not exist: do nothing
	d. 'package.json' deleted and current process exists: close the main process
2. detect all code modules.
3. create dependency tree from main initial module.
4. create dependency tree from renderer initial modules .

*/
