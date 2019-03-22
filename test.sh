#!/bin/bash -e

main() {
       # set up run test case
. testParams.env
  npm install
npm run start-test
}

main
