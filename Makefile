default:
	@echo Installing npm package dependencies of test groups...
	for g in `ls groups`; do cd groups/"$$g" && ([[ -e "node_modules" ]] && npm install --quiet --no-bin-links || echo) && bower install && cd ../..; done
	@echo
	@echo Done! Now run tests with:
	@echo '  ' mocha
