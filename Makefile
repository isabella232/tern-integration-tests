default:
	@echo Installing npm package dependencies of test groups...
	for g in `ls groups`; do cd groups/"$$g" && npm update --quiet --no-bin-links && cd ../..; done
	@echo
	@echo Done! Now run tests with:
	@echo '  ' mocha
