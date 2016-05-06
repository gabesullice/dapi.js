SOURCE_DIRECTORY=src
BUILD_DIRECTORY=build
DIST_DIRECTORY=dist
TESTS_DIRECTORY=tests

UGLIFY_COMMAND=$(shell pwd)/node_modules/uglify-js/bin/uglifyjs
TEST_COMMAND=$(shell pwd)/node_modules/mocha/bin/mocha $(TESTS_DIRECTORY)

UGLIFY_OPTIONS=--compress

build: $(DIST_DIRECTORY)/entityQuery.min.js $(DIST_DIRECTORY)/dapi.min.js

clean:
	rm -rf $(DIST_DIRECTORY)/*

tests:
	- $(TEST_COMMAND)

rebuild: .watch tests build

watch: .watch
	while true; do sleep .75; make -s checksum; done;

checksum:
	cat `find . -type f ! -path *./.git* ! -name .watch` | base64 | md5sum --status -c .watch || make -s rebuild

.watch:
	cat `find . -type f ! -path *./.git* ! -name .watch` | base64 | md5sum | tee .watch

$(DIST_DIRECTORY)/%.min.js: $(BUILD_DIRECTORY)/%.js
	$(UGLIFY_COMMAND) $< $(UGLIFY_OPTIONS) > $@

$(BUILD_DIRECTORY)/%.js: $(SOURCE_DIRECTORY)/%.js
	browserify $(SOURCE_DIRECTORY)/$(shell basename $@) > $@

.PHONY: build clean tests rebuild .watch
