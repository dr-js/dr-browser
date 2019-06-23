import { strictEqual } from 'dr-js/module/common/verify'

import {
  getQuickCanvas,
  getQuickContext2d
} from './ImageData'

const { describe, it } = global

describe('Graphic.ImageData', () => {
  it('getQuickCanvas()', async () => {
    strictEqual(
      getQuickCanvas() instanceof window.HTMLCanvasElement,
      true
    )
  })

  it('getQuickContext2d()', async () => {
    strictEqual(
      getQuickContext2d() instanceof window.CanvasRenderingContext2D,
      true
    )
  })
})
