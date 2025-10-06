import moment from 'moment'
import type { FC } from 'react'
import { Text, View } from 'react-native'

import type { Period } from './use-stats'

interface YAxisLabelsProps {
  dates: Date[]
  period: Period
}

export const YAxisLabels: FC<YAxisLabelsProps> = ({ dates, period }) => {
  return (
    <View className="mt-4 flex-row justify-between">
      {dates.map((date) => (
        <Text
          key={date.toString()}
          className="text-center capitalize text-foreground-400"
        >
          {moment(date).format(period === 'day' ? 'DD' : 'MMM')}
        </Text>
      ))}
    </View>
  )
}
