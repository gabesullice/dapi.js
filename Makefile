SOURCE_DIRECTORY=src
BUILD_DIRECTORY=build
DIST_DIRECTORY=dist
TESTS_DIRECTORY=tests

TEST_COMMAND=$(shell pwd)/node_modules/mocha/bin/mocha $(TESTS_DIRECTORY)

build: EntityQuery.js Sort.js

clean:
	rm -rf $(DIST_DIRECTORY)/*

tests:
	- $(TEST_COMMAND)

rebuild: .watch
	make clean
	make build
	make tests

watch: .watch
	while true; do sleep .5; make -s checksum; done;

checksum:
	cat `find . -type f ! -path *./.git* ! -name .watch` | base64 | md5sum --status -c .watch || make -s rebuild

.watch:
	cat `find . -type f ! -path *./.git* ! -name .watch` | base64 | md5sum | tee .watch

EntityQuery.js: $(DIST_DIRECTORY)/EntityQuery.js

Sort.js: $(DIST_DIRECTORY)/QueryOption/Sort.js

$(DIST_DIRECTORY)/%.js:
	cp -r $(SOURCE_DIRECTORY)/* $(DIST_DIRECTORY)/

$(DIST_DIRECTORY)/%:
	mkdir -p $@

.PHONY: build clean tests rebuild .watch
