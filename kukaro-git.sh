#!/usr/bin/env bash
git add .
if [ $1 ];then
	git commit -m "compact"
else
	git commit -m "$1"
fi
git push
