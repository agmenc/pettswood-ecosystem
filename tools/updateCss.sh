#!/bin/sh

wget --no-check-certificate https://raw.github.com/agmenc/Pettswood/master/src/test/resources/css/pettswood.css
mv -f pettswood.css wizzywig/src/test/css/
