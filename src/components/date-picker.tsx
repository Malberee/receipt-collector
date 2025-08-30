import { ChevronIcon } from '@malberee/heroui-native'
import React, { type FC } from 'react'
import { View } from 'react-native'
import DateTimePicker from 'react-native-ui-datepicker'

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <View className="rounded-xl bg-default-100">
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date as Date)}
        components={{
          IconPrev: <ChevronIcon className="text-foreground" />,
          IconNext: (
            <ChevronIcon
              transform={[{ rotate: '180deg' }]}
              className="text-foreground"
            />
          ),
        }}
        classNames={{
          time_label: 'text-foreground text-3xl',
          time_selector_label: 'text-foreground',
          year_label: 'text-foreground',
          year_selector_label: 'text-foreground',
          selected_year: 'bg-primary rounded-xl',
          month_selector_label: 'text-foreground',
          selected_month: 'bg-primary rounded-xl',
          month_label: 'text-foreground',
          weekday_label: 'text-primary-foreground bg-primary rounded-full px-2',
          day_label: 'text-foreground',
          selected: 'rounded-xl aspect-square !bg-primary',
          selected_label: 'text-primary-foreground',
          today: 'rounded-xl bg-default-300 dark:bg-default-200',
        }}
        timePicker
      />
    </View>
  )
}
