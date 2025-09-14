import { Button } from '@malberee/heroui-native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Chart, type ChartProps } from 'screens/stats/chart'

import { Container } from '@components'
import { MenuIcon } from '@icons'
import { useDrawer } from '@providers'

import { Tabs } from './tabs'

export const Stats = () => {
  const { t } = useTranslation()
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
        <Chart title={t('Number of receipts')} param="count" period={period} />
        <Chart title={t('Expenses')} param="amount" period={period} />
      </View>
      <View className="mt-6">
        <Tabs
          value={period}
          values={[t('week'), t('month')] as ['week', 'month']}
          onValueChange={setPeriod}
        />
      </View>
    </Container>
  )
}
