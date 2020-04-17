# @dr-js/browser

[![i:npm]][l:npm]
[![i:ci]][l:ci]
[![i:size]][l:size]
[![i:npm-dev]][l:npm]

A collection of strange functions, for browser

[i:npm]: https://img.shields.io/npm/v/@dr-js/browser?colorB=blue
[i:npm-dev]: https://img.shields.io/npm/v/@dr-js/browser/dev
[l:npm]: https://npm.im/@dr-js/browser
[i:ci]: https://img.shields.io/github/workflow/status/dr-js/dr-browser/ci-test
[l:ci]: https://github.com/dr-js/dr-browser/actions?query=workflow:ci-test
[i:size]: https://packagephobia.now.sh/badge?p=@dr-js/browser
[l:size]: https://packagephobia.now.sh/result?p=@dr-js/browser

[//]: # (NON_PACKAGE_CONTENT)

- 📁 [source/](source/)
  - main source code, in output package will be:
    - `@dr-js/browser/library`: for direct browser use, all bundled up
    - `@dr-js/browser/module`: for re-pack, keep `import / export` and readability
- 📁 [example/](example/)
  - some example (unsorted tests)
- 📄 [SPEC.md](SPEC.md)
  - list of all directly accessible codes, sort of API lockfile
