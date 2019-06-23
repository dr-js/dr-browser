import { resolve, sep } from 'path'
import { execSync } from 'child_process'
import { writeFileSync, existsSync } from 'fs'

import { collectSourceRouteMap } from 'dr-dev/module/node/export/parse'
import { generateIndexScript, generateExportInfo } from 'dr-dev/module/node/export/generate'
import { autoAppendMarkdownHeaderLink, renderMarkdownExportPath, renderMarkdownExportTree } from 'dr-dev/module/node/export/renderMarkdown'
import { runMain } from 'dr-dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

const [
  ,
  ,
  PATH_FILE_DELETE_CONFIG_RAW
] = process.argv

const PATH_FILE_DELETE_CONFIG = resolve(process.cwd(), PATH_FILE_DELETE_CONFIG_RAW)

const generateTempFile = ({ sourceRouteMap, logger }) => {
  const tempFileList = []
  const writeTempFile = (path, data) => {
    logger.devLog(`[tempFile] ${path}`)
    writeFileSync(path, data)
    tempFileList.push(path)
  }

  const indexScriptMap = generateIndexScript({ sourceRouteMap })
  Object.entries(indexScriptMap).forEach(([ path, data ]) => writeTempFile(path, data))

  writeFileSync(PATH_FILE_DELETE_CONFIG, JSON.stringify({
    drJsFileModifyDelete: [ ...tempFileList, PATH_FILE_DELETE_CONFIG ],
    drJsQuiet: true
  }))
}

runMain(async (logger) => {
  if (existsSync(PATH_FILE_DELETE_CONFIG)) {
    logger.padLog(`[clear] delete previous temp build file`)
    execSync('npm run script-delete-temp-build-file', { cwd: fromRoot(), stdio: 'ignore', shell: true })
  }

  logger.padLog(`collect sourceRouteMap`)
  const sourceRouteMap = await collectSourceRouteMap({ pathRootList: [ fromRoot('source') ], logger })

  logger.padLog(`generate exportInfo`)
  const exportInfoMap = generateExportInfo({ sourceRouteMap })

  logger.log(`output: SPEC.md`)
  const initRouteList = fromRoot('source').split(sep)
  writeFileSync(fromRoot('SPEC.md'), [
    '# Specification',
    '',
    ...autoAppendMarkdownHeaderLink(
      '#### Export Path',
      ...renderMarkdownExportPath({ exportInfoMap, rootPath: PATH_ROOT }),
      '',
      '#### Export Tree',
      ...renderMarkdownExportTree({ exportInfo: exportInfoMap[ initRouteList.join('/') ], routeList: initRouteList })
    ),
    ''
  ].join('\n'))

  logger.log(`output: ${PATH_FILE_DELETE_CONFIG_RAW}`)
  generateTempFile({ sourceRouteMap, logger })
}, 'generate-spec')