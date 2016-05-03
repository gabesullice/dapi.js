SOURCE_DIRECTORY=src
BUILD_DIRECTORY=build
DIST_DIRECTORY=dist

TEST_COMMAND=$(shell pwd)/node_modules/mocha/bin/mocha

build: EntityQuery.js

clean:
	rm -rf $(DIST_DIRECTORY)/*

tests:
	- $(TEST_COMMAND) tests

EntityQuery.js: $(DIST_DIRECTORY)/EntityQuery.js

$(DIST_DIRECTORY)/%.js:
	cp $(SOURCE_DIRECTORY)/$(@F) $@

.PHONY: build clean tests
