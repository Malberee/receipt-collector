import { useState } from 'react'
import { View } from 'react-native'
import { Chart, type ChartProps } from 'screens/stats/chart'

import { BackButton } from '@components'

import { Tabs } from './tabs'

export const Stats = () => {
  const [period, setPeriod] = useState<ChartProps['period']>('week')

  return (
    <View className="flex-1">
      <BackButton />

      <View className="flex-1 flex-col gap-4">
        <Chart title="Amount" param="amount" period={period} />
        <Chart title="Sum" param="sum" period={period} />
      </View>
      <View className="mt-6">
        <Tabs
          value={period}
          values={['week', 'month']}
          onValueChange={setPeriod}
        />
      </View>
    </View>
  )
}
