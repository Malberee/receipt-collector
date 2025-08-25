import React, { type FC, useEffect } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { interpolatePath, parse } from 'react-native-redash'
import Svg, { Path } from 'react-native-svg'

interface BlobsProps {
  color: string
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const TOP_PATH_START = parse(
  'M235.8 287.212C209.309 281.007 236.473 222.491 222.5 199C208.527 175.509 236.479 108.967 214.5 97C192.521 85.0328 219.906 36.9921 198 26C176.094 15.0079 109.576 53.799 105.5 21C101.424 -11.7103 6.84111 26.771 0 0H235.8V287.212Z',
)
const TOP_PATH_END = parse(
  'M247 287.212C220.509 281.007 193.945 274.713 179.972 251.222C165.998 227.731 170.979 193.967 149 182C127.021 170.033 94.4061 160.492 72.5 149.5C50.5939 138.508 5.57556 113.299 1.50001 80.5C-2.57555 47.7897 18.0411 26.771 11.2 0H247V287.212Z',
)

const BOTTOM_PATH_START = parse(
  'M0 0C22.7794 19.2361 23.8482 53.4473 29.5 90C34.811 124.348 10.5 141 29.5 179C45 210 24.5511 238.661 29.5 261C34.4489 283.25 78 242.699 117 264C159.5 287.212 199.338 271.522 235.8 287.212H0V0Z',
)
const BOTTOM_PATH_END = parse(
  'M0 0.787476C22.7794 20.0236 21.3433 45.2708 37.5 63C53.5839 80.7292 69.4994 71.9153 96.5 77.5C123.573 82.996 161.051 117.161 166 139.5C170.949 161.75 161.057 191.199 161.931 223.909C162.877 256.619 199.338 272.31 235.8 288H0V0.787476Z',
)

export const Blobs: FC<BlobsProps> = ({ color }) => {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    })
  }, [])

  const topPath = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, 1],
      [TOP_PATH_START, TOP_PATH_END],
    )
    return { d }
  })

  const bottomPath = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, 1],
      [BOTTOM_PATH_START, BOTTOM_PATH_END],
    )
    return { d }
  })

  const style: StyleProp<ViewStyle> = {
    position: 'absolute',
    width: 236,
    height: 288,
  }

  return (
    <>
      <Svg style={{ ...style, top: 0, right: 0 }}>
        <AnimatedPath animatedProps={topPath} fill={color} />
      </Svg>
      <Svg style={{ ...style, bottom: 0, left: 0 }}>
        <AnimatedPath animatedProps={bottomPath} fill={color} />
      </Svg>
    </>
  )
}
