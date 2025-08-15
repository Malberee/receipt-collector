import { Dimensions } from 'react-native'
import type { Code, CodeScannerFrame } from 'react-native-vision-camera'

export const mapScreenToFrame = (
  cameraFrame: CodeScannerFrame,
  scanArea: NonNullable<Code['frame']>,
) => {
  const screen = Dimensions.get('screen')

  const scale = Math.max(
    screen.width / cameraFrame.width,
    screen.height / cameraFrame.height,
  )
  const frameScaledWidth = cameraFrame.width * scale
  const frameScaledHeight = cameraFrame.height * scale
  const cropX = (frameScaledWidth - screen.width) / 2
  const cropY = (frameScaledHeight - screen.height) / 2

  return {
    x: (scanArea.x + cropX) / scale,
    y: (scanArea.y + cropY) / scale,
    width: scanArea.width / scale,
    height: scanArea.height / scale,
  }
}
