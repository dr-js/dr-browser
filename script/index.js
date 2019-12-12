import { resolve } from 'path'
import { execSync } from 'child_process'

import { getScriptFileListFromPathList } from '@dr-js/dev/module/node/file'
import { initOutput, packOutput, verifyNoGitignore, verifyGitStatusClean, publishOutput } from '@dr-js/dev/module/output'
import { processFileList, fileProcessorBabel, fileProcessorWebpack } from '@dr-js/dev/module/fileProcessor'
import { getTerserOption, minifyFileListWithTerser } from '@dr-js/dev/module/minify'
import { runMain, argvFlag } from '@dr-js/dev/module/main'

import { modifyDelete } from '@dr-js/core/module/node/file/Modify'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execShell = (command) => execSync(command, { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit' })

const buildOutput = async ({ logger }) => {
  logger.padLog('generate index.js & spec doc')
  execShell('npm run script-generate-spec')
  logger.padLog('build webpack')
  execShell('npm run build-webpack')
  logger.padLog('delete temp build file')
  execShell('npm run script-delete-temp-build-file')
  logger.padLog('build module')
  execShell('npm run build-module')
}

const processOutput = async ({ logger }) => {
  const fileListModule = await getScriptFileListFromPathList([ 'module' ], fromOutput)
  const fileListLibrary = await getScriptFileListFromPathList([ 'library' ], fromOutput)
  let sizeReduce = 0
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListModule, option: getTerserOption({ isReadable: true }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListLibrary, option: getTerserOption(), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await processFileList({ fileList: fileListModule, processor: fileProcessorBabel, rootPath: PATH_OUTPUT, logger })
  sizeReduce += await processFileList({ fileList: fileListLibrary, processor: fileProcessorWebpack, rootPath: PATH_OUTPUT, logger })
  logger.padLog(`total size reduce: ${sizeReduce}B`)
}

const clearOutput = async ({ logger }) => {
  logger.log('clear test')
  const fileList = await getScriptFileListFromPathList([ '.' ], fromOutput, (path) => path.endsWith('.test.js'))
  for (const filePath of fileList) await modifyDelete(filePath)
}

runMain(async (logger) => {
  await verifyNoGitignore({ path: fromRoot('source'), logger })
  const packageJSON = await initOutput({ fromRoot, fromOutput, logger })
  if (!argvFlag('pack')) return
  if (argvFlag('test', 'publish', 'publish-dev')) {
    logger.padLog('lint source')
    execShell('npm run lint')
  }
  await buildOutput({ logger })
  await processOutput({ logger })
  if (argvFlag('test', 'publish', 'publish-dev')) {
    await processOutput({ logger }) // once more
    logger.padLog('test browser')
    execShell('npm run test-browser')
  }
  await clearOutput({ logger })
  await verifyGitStatusClean({ fromRoot, logger })
  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ flagList: process.argv, packageJSON, pathPackagePack, logger })
})
