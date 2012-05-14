#!/bin/sh

inputs=$(ls src/main/javascript/ | sort | grep -v "min" | sed 's/^/ --js src\/main\/javascript\//')
compilationLevel="--compilation_level SIMPLE_OPTIMIZATIONS"
#compilationLevel="--compilation_level ADVANCED_OPTIMIZATIONS"

java -jar minifier/compiler.jar  $compilationLevel $inputs --js_output_file src/main/javascript/wizzywig.min.js
