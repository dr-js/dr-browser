# dr-browser

[![i:npm]][l:npm]
[![i:ci]][l:ci]
[![i:size]][l:size]
[![i:lint]][l:lint]
[![i:npm-dev]][l:npm]

A collection of strange functions, for browser

[i:npm]: https://img.shields.io/npm/v/dr-browser.svg?colorB=blue
[i:npm-dev]: https://img.shields.io/npm/v/dr-browser/dev.svg
[l:npm]: https://npm.im/dr-browser
[i:ci]: https://img.shields.io/travis/dr-browser/dr-browser/master.svg
[l:ci]: https://travis-ci.org/dr-browser/dr-browser
[i:size]: https://packagephobia.now.sh/badge?p=dr-browser
[l:size]: https://packagephobia.now.sh/result?p=dr-browser
[i:lint]: https://img.shields.io/badge/code_style-standard_ES6+-yellow.svg
[l:lint]: https://standardjs.com

[//]: # (NON_PACKAGE_CONTENT)

- 📁 [source/](source/)
  - main source code, in output package will be:
    - `dr-browser/library`: for direct browser use, all bundled up
    - `dr-browser/module`: for re-pack, keep `import / export` and readability
- 📁 [example/](example/)
  - some example (unsorted tests)
- 📄 [SPEC.md](SPEC.md)
  - list of all directly accessible codes, sort of an API lockfile
