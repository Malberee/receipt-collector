import { Dimensions } from 'react-native'

export const getScannableAreaSize = (width: number, height: number) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window')

  return {
    x: SCREEN_WIDTH / 2 - width / 2,
    y: SCREEN_HEIGHT / 2 - height / 2,
    width: width,
    height: height,
  }
}
