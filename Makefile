install:
	npm ci
	
publish:
	npm publish --dry-run

lint:
	npm run lint

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage