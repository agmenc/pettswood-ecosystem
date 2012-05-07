#!/bin/sh

inputs=$(find src/main/javascript/ -name "*.js" | grep -v "min" | sed 's/^/ --js /')
compilationLevel="--compilation_level SIMPLE_OPTIMIZATIONS"
#compilationLevel="--compilation_level ADVANCED_OPTIMIZATIONS"

java -jar minifier/compiler.jar  $compilationLevel $inputs --js_output_file src/main/javascript/wizzywig.min.js
