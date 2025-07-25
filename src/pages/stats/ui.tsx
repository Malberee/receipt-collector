import { Button, ChevronDown } from '@malberee/heroui-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'

import { Chart, type ChartProps } from '@widgets/chart'

import { Tabs } from '@shared/ui'

export const Stats = () => {
  const [period, setPeriod] = useState<ChartProps['period']>('week')

  return (
    <View className="flex-1">
      <Button
        isIconOnly
        variant="light"
        size="lg"
        color="default"
        className="mb-4"
        startContent={
          <ChevronDown
            className="text-foreground"
            width="24px"
            height="24px"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        }
        onPress={() => router.dismiss()}
      />

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
