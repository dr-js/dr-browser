# Specification

* [Export Path](#export-path)
* [Export Tree](#export-tree)

#### Export Path
+ 📄 [source/font/fontGenerator.js](source/font/fontGenerator.js)
  - `createFontGenerator`
+ 📄 [source/font/fontGeneratorBitmap.js](source/font/fontGeneratorBitmap.js)
  - `createFontGeneratorBitmap`
+ 📄 [source/font/fontMapper.js](source/font/fontMapper.js)
  - `createFontMapper`
+ 📄 [source/font/fontRender.js](source/font/fontRender.js)
  - `createFontRender`
+ 📄 [source/font/fontRenderBitmap.js](source/font/fontRenderBitmap.js)
  - `createFontRenderBitmap`
+ 📄 [source/graphic/CanvasImageDataOperation.js](source/graphic/CanvasImageDataOperation.js)
  - `crop`, `drawPixel`, `drawPixelLine`, `drawPixelLineList`, `floodFill`, `getPixelColor`, `replacePixelColor`, `scale`
+ 📄 [source/graphic/Color.js](source/graphic/Color.js)
  - `getHexFromRGB`, `getHexFromRGBA`, `getRGBAFromUint32RGBA`, `getUint32RGBA`
+ 📄 [source/graphic/ImageData.js](source/graphic/ImageData.js)
  - `applyCanvasElementExt`, `applyCanvasImageDataExt`, `applyImageElementExt`, `canvasElementToCanvasImageData`, `canvasImageDataToCanvasElement`, `createCanvasElement`, `createCanvasImageData`, `createImageElement`, `getQuickCanvas`, `getQuickContext2d`, `imageElementToCanvasElement`, `imageElementToCanvasImageData`
+ 📄 [source/input/EnhancedEventProcessor.js](source/input/EnhancedEventProcessor.js)
  - `createSwipeEnhancedEventProcessor`
+ 📄 [source/module/MotionAutoTimer.js](source/module/MotionAutoTimer.js)
  - `createInterpolationAutoTimer`, `createVectorAccumulator`

#### Export Tree
- **Font**
  - `createFontGenerator`, `createFontGeneratorBitmap`, `createFontMapper`, `createFontRender`, `createFontRenderBitmap`
- **Graphic**
  - **CanvasImageDataOperation**
    - `crop`, `drawPixel`, `drawPixelLine`, `drawPixelLineList`, `floodFill`, `getPixelColor`, `replacePixelColor`, `scale`
  - **Color**
    - `getHexFromRGB`, `getHexFromRGBA`, `getRGBAFromUint32RGBA`, `getUint32RGBA`
  - **ImageData**
    - `applyCanvasElementExt`, `applyCanvasImageDataExt`, `applyImageElementExt`, `canvasElementToCanvasImageData`, `canvasImageDataToCanvasElement`, `createCanvasElement`, `createCanvasImageData`, `createImageElement`, `getQuickCanvas`, `getQuickContext2d`, `imageElementToCanvasElement`, `imageElementToCanvasImageData`
- **Input**
  - **EnhancedEventProcessor**
    - `createSwipeEnhancedEventProcessor`
- **Module**
  - **MotionAutoTimer**
    - `createInterpolationAutoTimer`, `createVectorAccumulator`
