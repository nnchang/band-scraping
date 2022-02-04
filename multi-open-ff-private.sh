#!/bin/sh
awk '{print "--private-window";print $0}' | xargs -n 2 /Applications/Firefox.app/Contents/MacOS/firefox
