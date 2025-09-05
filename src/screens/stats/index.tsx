import { Button } from '@malberee/heroui-native'
import { useState } from 'react'
import { View } from 'react-native'
import { Chart, type ChartProps } from 'screens/stats/chart'

import { Container } from '@components'
import { MenuIcon } from '@icons'
import { useDrawer } from '@providers'

import { Tabs } from './tabs'

export const Stats = () => {
  const [period, setPeriod] = useState<ChartProps['period']>('week')
  const { show } = useDrawer()

  return (
    <Container>
      <Button
        isIconOnly
        variant="light"
        size="lg"
        color="default"
        startContent={
          <MenuIcon className="text-foreground" width={28} height={28} />
        }
        className="mb-4"
        onPress={show}
      />

      <View className="flex-1 flex-col gap-4">
        <Chart title="Receipts over time" param="count" period={period} />
        <Chart title="Spending over time" param="amount" period={period} />
      </View>
      <View className="mt-6">
        <Tabs
          value={period}
          values={['week', 'month']}
          onValueChange={setPeriod}
        />
      </View>
    </Container>
  )
}
