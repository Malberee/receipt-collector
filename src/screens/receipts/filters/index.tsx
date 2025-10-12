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

import { DateRangePicker } from './date-ranger-picker'
import { Rarities } from './rarities'
import { useFilters } from './use-filters'

interface FiltersProps {
  isExpanded: SharedValue<boolean>
}

export const Filters: FC<FiltersProps> = observer(({ isExpanded }) => {
  const { initialFilters, filters, onValueChange } = useFilters()
  const { amount, date, rarities } = filters
  const { amount: initialAmount } = initialFilters

  const { t } = useTranslation()
  const height = useSharedValue(0)
  const [amountRange, setAmountRange] = useState([0, initialAmount.to])

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration: 200,
    }),
  )

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }))

  useEffect(() => {
    setAmountRange([0, initialAmount.to])
  }, [initialAmount])

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
            maxValue={initialAmount.to}
            defaultValue={[0, initialAmount.to]}
            value={amountRange}
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
          min={date.from}
          max={date.to}
          onValueChange={([from, to]) => onValueChange('date', { from, to })}
        />

        <Rarities
          value={rarities}
          onValueChange={(values) => onValueChange('rarities', values)}
        />
      </View>
    </Animated.View>
  )
})

export * from './with-filters'
export * from './use-filters'
