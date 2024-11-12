import { Slider } from '@malberee/nextui-native'
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

interface FiltersReceiptsProps {
  isExpanded: SharedValue<boolean>
}

export const FiltersReceipts: FC<FiltersReceiptsProps> = observer(
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
      <Animated.View style={bodyStyle}>
        <View
          className="absolute w-full p-4"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height
          }}
        >
          <Slider
            label="Amount"
            defaultValue={[0, maxAmount]}
            maxValue={maxAmount}
            formatOptions={{ style: 'currency', currency: 'UAH' }}
            onChangeEnd={(values) =>
              handleChange('amount', values as [number, number])
            }
          />
        </View>
      </Animated.View>
    )
  },
)
