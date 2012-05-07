#!/bin/sh

inputs=$(find src/main/javascript/ -name "*.js" | egrep -v "(min)|(dev)" | sed 's/^/ --js /')

java -jar minifier/compiler.jar  --compilation_level ADVANCED_OPTIMIZATIONS $inputs --js_output_file src/main/javascript/wizzywig.min.js
