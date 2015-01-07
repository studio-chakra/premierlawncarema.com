#!/bin/sh

rsync -av --delete --exclude '.git' --exclude '.idea' --exclude '.gitignore' --exclude 'sync.sh' ~/dev/third/sproutforms ~/dev/www/sandbox.dev/craft/plugins/
