#!/bin/sh

wget https://raw.github.com/agmenc/Pettswood/master/src/test/resources/css/*.css
wget https://raw.github.com/agmenc/Pettswood/master/src/test/resources/javascript/*.js

mv -f *.css wizzywig/main/css/
mv -f *.js wizzywig/main/javascript/
