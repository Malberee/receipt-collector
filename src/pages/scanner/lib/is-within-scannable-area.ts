import type { Point } from 'expo-camera'

export const isWithinScannableArea = (
  cornerPoints: Point[],
  scannableArea: { x: number; y: number; width: number; height: number },
) => {
  return cornerPoints.every((point) => {
    const isWithinXRange =
      point.x >= scannableArea.x &&
      point.x <= scannableArea.x + scannableArea.width
    const isWithinYRange =
      point.y >= scannableArea.y &&
      point.y <= scannableArea.y + scannableArea.height
    return isWithinXRange && isWithinYRange
  })
}
