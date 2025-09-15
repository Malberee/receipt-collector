import { store } from '@store'
import { ChevronIcon } from 'merlo-ui'
import React, { type FC } from 'react'
import { View } from 'react-native'
import DateTimePicker from 'react-native-ui-datepicker'

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <View className="rounded-xl bg-default-100 p-2">
      <DateTimePicker
        mode="single"
        date={date}
        locale={store.preferences.lang}
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
          year_label: 'text-foreground text-center w-full',
          year_selector_label: 'text-foreground',
          selected_year: 'bg-default-300 dark:bg-default-200 rounded-md',
          active_year: '!bg-primary rounded-md',
          active_year_label: 'text-primary-foreground',
          month_selector_label: 'text-foreground capitalize',
          month_label: 'text-foreground capitalize',
          selected_month_label: 'text-primary-foreground text-center w-full',
          selected_month: 'bg-primary rounded-md',
          weekday_label:
            'text-primary-foreground bg-primary rounded-full px-2 capitalize',
          day_label: 'text-foreground text-center w-full',
          selected: 'rounded-md !bg-primary',
          selected_label: 'text-primary-foreground',
          today: 'rounded-md bg-default-300 dark:bg-default-200',
        }}
        timePicker
      />
    </View>
  )
}
