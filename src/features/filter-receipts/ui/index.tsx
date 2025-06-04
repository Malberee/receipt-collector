import { Slider } from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import React, { type FC } from 'react'
import { View } from 'react-native'
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useFilters } from '../model'
import { DateRangePicker } from './date-ranger-picker'
import { Rarities } from './rarities'

interface FilterReceiptsProps {
  isExpanded: SharedValue<boolean>
}

export const FilterReceipts: FC<FilterReceiptsProps> = observer(
  ({ isExpanded }) => {
    const { maxAmount, handleChange } = useFilters()

    const height = useSharedValue(0)

    const derivedHeight = useDerivedValue(() =>
      withTiming(height.value * Number(isExpanded.value), {
        duration: 200,
      }),
    )
    const bodyStyle = useAnimatedStyle(() => ({
      height: derivedHeight.value,
    }))

    return (
      <Animated.View className="overflow-hidden" style={bodyStyle}>
        <View
          className="absolute w-full flex-col gap-4 p-4"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height
          }}
        >
          {maxAmount > 0 ? (
            <Slider
              label="Amount"
              defaultValue={[0, maxAmount]}
              maxValue={maxAmount}
              formatOptions={{ style: 'currency', currency: 'UAH' }}
              onChangeEnd={(values) =>
                handleChange('amount', values as [number, number])
              }
            />
          ) : null}
          <DateRangePicker
            onValueChange={(values) => handleChange('date', values)}
          />
          <Rarities
            onValueChange={(values) => handleChange('rarities', values)}
          />
        </View>
      </Animated.View>
    )
  },
)
