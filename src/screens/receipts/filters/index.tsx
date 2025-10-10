import { store } from '@store'
import { Slider } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'

import type { Rarity } from '@constants'

import type { FiltersType } from '../utils'
import { DateRangePicker } from './date-ranger-picker'
import { Rarities } from './rarities'

type RangeFilter<T> = {
  from?: T
  to?: T
}

type Overload = {
  (key: 'amount', value: RangeFilter<number>): void
  (key: 'date', value: RangeFilter<Date>): void
  (key: 'rarities', value: Rarity[]): void
}

interface FiltersProps {
  filters: FiltersType
  isExpanded: SharedValue<boolean>
  onValueChange: Overload
}

export const Filters: FC<FiltersProps> = observer(
  ({ filters, isExpanded, onValueChange }) => {
    const { amount, date } = filters

    const { t } = useTranslation()
    const height = useSharedValue(0)
    const [amountRange, setAmountRange] = useState([amount.from, amount.to])

    const derivedHeight = useDerivedValue(() =>
      withTiming(height.value * Number(isExpanded.value), {
        duration: 200,
      }),
    )

    const bodyStyle = useAnimatedStyle(() => ({
      height: derivedHeight.value,
    }))

    useEffect(() => {
      setAmountRange([amount.from, amount.to])
    }, [amount.from, amount.to])

    return (
      <Animated.View style={[bodyStyle, { overflow: 'hidden' }]}>
        <View
          className="absolute w-full flex-col gap-4 p-4"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height
          }}
        >
          {amount.to > 0 ? (
            <Slider
              label={t('Amount')}
              maxValue={amount.to}
              defaultValue={[0, amount.to]}
              value={amountRange}
              // value={[amount.from, amount.to]}
              onChange={(values) => setAmountRange(values as number[])}
              onChangeEnd={(values) => {
                const [from, to] = values as number[]
                onValueChange('amount', { from, to })
              }}
              formatOptions={{
                style: 'currency',
                currency: store.preferences.currency,
              }}
            />
          ) : null}

          <DateRangePicker
            min={new Date(date.from).getTime()}
            max={new Date(date.to).getTime()}
            onValueChange={([from, to]) => onValueChange('date', { from, to })}
          />

          <Rarities
            onValueChange={(values) => onValueChange('rarities', values)}
          />
        </View>
      </Animated.View>
    )
  },
)
