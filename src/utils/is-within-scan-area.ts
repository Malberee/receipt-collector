import type { Code } from 'react-native-vision-camera'

export const isWithinScanArea = (
  codeFrame: NonNullable<Code['frame']>,
  area: NonNullable<Code['frame']>,
) => {
  return (
    codeFrame.x >= area.x &&
    codeFrame.y >= area.y &&
    codeFrame.x + codeFrame.width <= area.x + area.width &&
    codeFrame.y + codeFrame.height <= area.y + area.height
  )
}
