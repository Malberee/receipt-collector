import { store } from '@store'
import { Button, cn, semanticColors } from 'merlo-ui'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Container } from '@components'
import { MenuIcon } from '@icons'
import { useDrawer, useTheme } from '@providers'
import { formatCurrency } from '@utils'

import { Chart } from './chart'
import { DateRangePicker } from './date-range-picker'
import { Legend } from './legend'
import { Tabs } from './tabs'
import { type Period, useStats } from './use-stats'
import { YAxisLabels } from './y-axis-labels'

export const Stats = () => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState<Period>('day')
  const [dates, setDates] = useState(getDatesArray(period))
  const { show } = useDrawer()
  const { current } = useTheme()

  const formatDate = (date: Date) =>
    moment(date).format(period === 'day' ? 'ddd' : 'MMM')

  function getDatesArray(period: Period) {
    const start = moment()
      .subtract(period === 'day' ? 6 : 5, period === 'day' ? 'days' : 'months')
      .startOf(period)
      .toDate()
    const end = moment(new Date()).endOf(period).toDate()
    if (moment(end).isBefore(start)) return []

    const result: Date[] = []
    const current = moment(start)

    while (current.isSameOrBefore(end)) {
      result.push(current.toDate())
      current.add(1, period)
    }

    result[result.length - 1] = end

    return result
  }

  const amount = useStats('amount', dates, period)
  const count = useStats('count', dates, period)

  const timestamps = store
    .getReceipts()
    .map((receipt) => new Date(receipt.date).getTime())

  const charts = [
    {
      name: 'Expenses',
      data: amount,
      colors: {
        default: semanticColors[current].success[400]!,
        active: semanticColors[current].success[600]!,
        tooltipBackground: semanticColors[current].success[50]!,
      },
      props: {
        formatValue: (value: number) =>
          formatCurrency(value, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }),
        formatDate,
      },
    },
    {
      name: 'Number of reciepts',
      data: count,
      colors: {
        default: semanticColors[current].primary[400]!,
        active: semanticColors[current].primary[600]!,
        tooltipBackground: semanticColors[current].primary[50]!,
      },
      props: { formatDate },
    },
  ]

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

      <DateRangePicker
        value={dates}
        period={period}
        onValueChange={setDates}
        min={new Date(Math.min(...timestamps))}
        max={new Date(Math.max(...timestamps))}
      />

      <View className="-m-4 flex-1 flex-col">
        {charts.map(({ data, name, colors, props }, index) => (
          <Fragment key={name}>
            <Chart data={data} colors={colors} {...props} />
            {index !== charts.length - 1 ? (
              <View
                className={cn(
                  'mx-8 h-px bg-default-200',
                  current === 'dark' && 'bg-default-100',
                )}
              />
            ) : null}
          </Fragment>
        ))}
      </View>

      <YAxisLabels dates={dates} period={period} />
      <Legend
        charts={charts.map(({ name, colors }) => ({
          name,
          color: colors.default,
        }))}
      />

      <View className="mt-6">
        <Tabs
          value={period}
          values={[t('day'), t('month')] as ['day', 'month']}
          onValueChange={(value) => {
            setPeriod(value)
            setDates(getDatesArray(value))
          }}
        />
      </View>
    </Container>
  )
}
