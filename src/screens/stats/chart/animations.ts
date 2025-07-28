import {
  Easing,
  type ExitAnimationsValues,
  withTiming,
} from 'react-native-reanimated'

const options = {
  duration: 700,
  easing: Easing.out(Easing.quad),
}

export const ExitingAnimation = (values: ExitAnimationsValues) => {
  'worklet'
  const animations = {
    opacity: withTiming(0, options),
    transform: [
      {
        scaleY: withTiming(0, options),
      },
    ],
  }
  const initialValues = {
    opacity: 1,
    transform: [
      {
        scaleY: 1,
      },
    ],
  }

  return { animations, initialValues }
}

export const EntryAnimation = (values: ExitAnimationsValues) => {
  'worklet'
  const animations = {
    opacity: withTiming(1, options),
    transform: [
      {
        scaleY: withTiming(1, options),
      },
    ],
  }
  const initialValues = {
    opacity: 0,
    transform: [
      {
        scaleY: 0,
      },
    ],
  }

  return { animations, initialValues }
}
