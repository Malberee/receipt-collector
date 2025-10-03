// source https://github.com/software-mansion/react-native-svg/blob/main/src/lib/extract/extractGradient.ts

const percentReg = /^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(%?)$/

export function percentToFloat(
  percent:
    | number
    | string
    | {
        __getAnimatedValue: () => number
      },
): number {
  if (typeof percent === 'number') {
    return percent
  }
  if (
    typeof percent === 'object' &&
    typeof percent.__getAnimatedValue === 'function'
  ) {
    return percent.__getAnimatedValue()
  }
  const matched = typeof percent === 'string' && percent.match(percentReg)
  if (!matched) {
    // eslint-disable-next-line no-console
    console.warn(`"${percent}" is not a valid number or percentage string.`)
    return 0
  }

  return matched[2] ? +matched[1] / 100 : +matched[1]
}
