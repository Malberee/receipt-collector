import moment from 'moment'
import { type FC, useState } from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { EntryAnimation, ExitingAnimation } from './lib'
import { useChart } from './model'

export interface ChartProps {
  title: string
  param: 'amount' | 'sum'
  period: 'week' | 'month'
}

export const Chart: FC<ChartProps> = ({ title, param, period }) => {
  const [height, setHeight] = useState(20)
  const { data } = useChart(param, period)

  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <View className="flex-1 rounded-medium bg-default-100 p-4">
      <Text className="mb-4 text-2xl text-foreground">{title}</Text>
      <View
        className="flex-1 flex-row items-end justify-around"
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      >
        <View className="absolute left-0 top-0 size-full flex-col justify-between">
          {Array(6)
            .fill(undefined)
            .map((_, index) => (
              <View key={index} className="h-px w-full bg-default-200" />
            ))}
        </View>

        {data.map(({ value, date }, index) => (
          <View
            className="w-8 flex-col items-center justify-end"
            style={{
              height: (value / maxValue) * height,
            }}
            key={date.toString()}
          >
            <Text className="opacity-0">{value}</Text>
            <Animated.View
              className="w-full flex-1 flex-row justify-center rounded-t-lg bg-primary"
              style={{
                maxHeight: height && value === 0 ? 1 : 'auto',
                minHeight: 1,
                transformOrigin: 'bottom',
              }}
              exiting={ExitingAnimation}
              entering={EntryAnimation}
            >
              <Text className="absolute -top-6 text-center text-foreground">
                {param === 'sum' ? '₴' : ''}
                {value}
              </Text>
            </Animated.View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-around">
        {data.map(({ date }) => (
          <Text
            key={date.toString()}
            className="w-8 text-center text-sm text-foreground"
            style={{ transformOrigin: 'top' }}
          >
            {moment(date).format(period === 'week' ? 'ddd' : 'MMM')}
          </Text>
        ))}
      </View>
    </View>
  )
}
