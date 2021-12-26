#!/bin/bash
read -e -p "Enter the release version : " VERSION
git checkout develop && \
git flow release start $VERSION && \
git flow release finish $VERSION
