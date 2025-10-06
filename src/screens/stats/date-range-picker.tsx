import { Button, ChevronIcon, type ButtonProps } from 'merlo-ui'
import moment from 'moment'
import { useEffect, useState, type FC } from 'react'
import { Text, View } from 'react-native'

import type { Period } from './use-stats'

interface DateRangePickerProps {
  value: Date[]
  period: Period
  min: Date
  max: Date
  onValueChange: (value: Date[]) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  value,
  period,
  min,
  max,
  onValueChange,
}) => {
  const [dates, setDates] = useState(value)
  const format = period === 'month' ? 'YYYY MMM' : 'DD MMM'

  const start = moment(dates[0]).format(format)
  const end = moment(dates[dates.length - 1]).format(format)

  const onPress = (type: 'next' | 'prev') => {
    const newDates = dates.map((date) => {
      const amount = period === 'day' ? 7 : 6

      if (type === 'next') return moment(date).add(amount, period).toDate()
      return moment(date).subtract(amount, period).toDate()
    })
    setDates(newDates)
    onValueChange(newDates)
  }

  const buttonProps: ButtonProps = {
    isIconOnly: true,
    color: 'default',
    variant: 'light',
  }

  useEffect(() => {
    setDates(value)
  }, [value])

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Button
        isDisabled={moment(dates[0]).isSameOrBefore(min, period)}
        startContent={
          <ChevronIcon className="text-foreground" width={24} height={24} />
        }
        onPress={() => onPress('prev')}
        {...buttonProps}
      />
      <Text className="text-lg text-foreground">
        {start} - {end}
      </Text>
      <Button
        isDisabled={moment(dates[dates.length - 1]).isSameOrAfter(max, period)}
        startContent={
          <ChevronIcon
            className="text-foreground"
            width={24}
            height={24}
            transform={[{ rotate: '180deg' }]}
          />
        }
        onPress={() => onPress('next')}
        {...buttonProps}
      />
    </View>
  )
}
