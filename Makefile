SOURCE_DIRECTORY=src
BUILD_DIRECTORY=build
DIST_DIRECTORY=dist

build: $(DIST_DIRECTORY)/dapi.js

clean:
	rm -rf $(DIST_DIRECTORY)/*

$(DIST_DIRECTORY)/dapi.js: $(BUILD_DIRECTORY)/dapi.js.build
	cp $< $@

$(BUILD_DIRECTORY)/dapi.js.build:
	cp $(SOURCE_DIRECTORY)/dapi.js $@

.PHONY: build
