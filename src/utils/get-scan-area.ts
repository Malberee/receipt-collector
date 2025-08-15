import { Dimensions } from 'react-native'

export const getScanArea = (width: number, height: number) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('screen')

  return {
    x: SCREEN_WIDTH / 2 - width / 2,
    y: SCREEN_HEIGHT / 2 - height / 2,
    width,
    height,
  }
}
