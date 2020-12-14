#!/usr/bin/env bash

GREEN="\033[1;32m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
DEFAULT="\033[0m"

OK=1
PROGRAM="$1"
DIR="$2"

if [ "$#" != 2 ]; then
  echo -e "${RED}ERROR: usage ./test.sh <program> <test-dir>${DEFAULT}"
  exit 1
fi;

for FILE in "$DIR"/*.in; do
  BASENAME="${FILE%.[^.]*}"
  echo -en "${YELLOW}${BASENAME##*/}${DEFAULT}: "

  ./"$PROGRAM" < "$FILE" | diff "$BASENAME".out - #&>/dev/null

  # shellcheck disable=SC2181
  if [[ $? == 0 ]]; then
    echo -e "${GREEN}PASS${DEFAULT}"
  else
    echo -e "${RED}FAIL${DEFAULT}"
    OK=0
  fi
done

if [[ $OK != 1 ]]; then
  echo -e "${RED}SOME TESTS ARE NOT PASSED${DEFAULT}"
  exit 1
fi

echo -e "${GREEN}ALL TESTS ARE PASSED SUCCESSFULLY${DEFAULT}"
