import { Button, cn, semanticColors } from 'merlo-ui'
import moment from 'moment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Container } from '@components'
import { MenuIcon } from '@icons'
import { useDrawer, useTheme } from '@providers'
import { formatCurrency } from '@utils'

import { Chart } from './chart'
import { Tabs } from './tabs'
import { type Period, useStats } from './use-stats'

export const Stats = () => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState<Period>('week')
  const { show } = useDrawer()
  const { current } = useTheme()

  const primaryColor = semanticColors[current].primary[400]!
  const successColor = semanticColors[current].success[400]!

  const amount = useStats('amount', period)
  const count = useStats('count', period)

  const formatDate = (date: Date) =>
    moment(date).format(period === 'week' ? 'ddd' : 'MMM')

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

      <View className="-m-4 flex-1 flex-col">
        <Chart
          data={amount}
          colors={{
            default: successColor,
            active: semanticColors[current].success[600]!,
            tooltipBackground: semanticColors[current].success[50]!,
          }}
          formatValue={(value) =>
            formatCurrency(value, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          }
          formatDate={formatDate}
        />
        <View
          className={cn(
            'mx-8 h-px bg-default-200',
            current === 'dark' && 'bg-default-100',
          )}
        />
        <Chart
          data={count}
          colors={{
            default: primaryColor,
            active: semanticColors[current].primary[600]!,
            tooltipBackground: semanticColors[current].primary[50]!,
          }}
          formatDate={formatDate}
        />
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
