import { store } from '@store'
import { Slider } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
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
  onValueChange: Overload
  isExpanded: SharedValue<boolean>
}

export const Filters: FC<FiltersProps> = observer(
  ({ isExpanded, onValueChange }) => {
    const maxAmount = Math.ceil(
      Math.max(...store.receipts.map((receipt) => receipt.amount)),
    )

    const timestamps = store.receipts.map((receipt) => moment(receipt.date))
    const minDate = moment.min(timestamps).clone().startOf('day')
    const maxDate = moment.max(timestamps).clone().endOf('day')

    const { t } = useTranslation()
    const height = useSharedValue(0)
    const [amountRange, setAmountRange] = useState([0, maxAmount])

    const derivedHeight = useDerivedValue(() =>
      withTiming(height.value * Number(isExpanded.value), {
        duration: 200,
      }),
    )

    const bodyStyle = useAnimatedStyle(() => ({
      height: derivedHeight.value,
    }))

    useEffect(() => {
      setAmountRange([0, maxAmount])
      onValueChange('amount', { from: 0, to: maxAmount })
    }, [maxAmount])

    return (
      <Animated.View style={[bodyStyle, { overflow: 'hidden' }]}>
        <View
          className="absolute w-full flex-col gap-4 p-4"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height
          }}
        >
          {maxAmount > 0 ? (
            <Slider
              label={t('Amount')}
              maxValue={maxAmount}
              defaultValue={[0, maxAmount]}
              value={amountRange}
              onChange={(value) => setAmountRange(value as number[])}
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
            min={minDate.valueOf()}
            max={maxDate.valueOf()}
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
