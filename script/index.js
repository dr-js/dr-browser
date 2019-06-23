import { resolve } from 'path'
import { execSync } from 'child_process'

import { getScriptFileListFromPathList } from 'dr-dev/module/node/fileList'
import { runMain, argvFlag } from 'dr-dev/module/main'
import { initOutput, packOutput, verifyNoGitignore, publishOutput } from 'dr-dev/module/output'
import { processFileList, fileProcessorBabel, fileProcessorWebpack } from 'dr-dev/module/fileProcessor'
import { getTerserOption, minifyFileListWithTerser } from 'dr-dev/module/minify'
import { writeLicenseFile } from 'dr-dev/module/license'

import { binary } from 'dr-js/module/common/format'
import { modify } from 'dr-js/module/node/file/Modify'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execOptionRoot = { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit', shell: true }

const buildOutput = async ({ logger: { padLog } }) => {
  padLog(`generate index.js & spec doc`)
  execSync('npm run script-generate-spec', execOptionRoot)

  padLog(`build webpack`)
  execSync('npm run build-webpack', execOptionRoot)

  padLog(`delete temp build file`)
  execSync('npm run script-delete-temp-build-file', execOptionRoot)

  padLog(`build module`)
  execSync('npm run build-module', execOptionRoot)
}

const processOutput = async ({ logger }) => {
  const fileListModule = await getScriptFileListFromPathList([ 'module' ], fromOutput)
  const fileListLibrary = await getScriptFileListFromPathList([ 'library' ], fromOutput)

  let sizeReduce = 0

  sizeReduce += await minifyFileListWithTerser({ fileList: fileListModule, option: getTerserOption({ isReadable: true }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListLibrary, option: getTerserOption(), rootPath: PATH_OUTPUT, logger })

  sizeReduce += await processFileList({ fileList: fileListModule, processor: fileProcessorBabel, rootPath: PATH_OUTPUT, logger })
  sizeReduce += await processFileList({ fileList: fileListLibrary, processor: fileProcessorWebpack, rootPath: PATH_OUTPUT, logger })

  logger.padLog(`total size reduce: ${binary(sizeReduce)}B`)
}

const clearOutput = async ({ logger }) => {
  logger.padLog(`clear output`)

  logger.log(`clear test`)
  const fileList = await getScriptFileListFromPathList([ '.' ], fromOutput, (path) => path.endsWith('.test.js'))
  for (const filePath of fileList) await modify.delete(filePath)
}

runMain(async (logger) => {
  await verifyNoGitignore({ path: fromRoot('source'), logger })

  const packageJSON = await initOutput({ fromRoot, fromOutput, logger })

  if (!argvFlag('pack')) return

  await buildOutput({ logger })
  await processOutput({ logger })

  if (argvFlag('test', 'publish', 'publish-dev')) {
    await processOutput({ logger }) // once more

    logger.padLog(`test browser`)
    execSync(`npm run test-browser`, execOptionRoot)
  }

  await clearOutput({ logger })
  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ flagList: process.argv, packageJSON, pathPackagePack, logger })
})
