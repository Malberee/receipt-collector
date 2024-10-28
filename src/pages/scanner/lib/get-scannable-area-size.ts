import { Dimensions } from 'react-native'

export const getScannableAreaSize = (innerDimension: number) => {
  const { width, height } = Dimensions.get('window')

  return {
    x: width / 2 - innerDimension / 2,
    y: height / 2 - innerDimension / 2,
    width: innerDimension,
    height: innerDimension,
  }
}
