import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { View } from 'react-native'
import DateTimePicker from 'react-native-ui-datepicker'

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

const StyledPicker = cssInterop(DateTimePicker, {
  calendarTextClassname: 'calendarTextStyle',
  headerTextClassname: 'headerTextStyle',
  weekDaysTextClassName: 'weekDaysTextStyle',
  headerButtonColorClassname: {
    target: false,
    nativeStyleToProp: {
      color: 'headerButtonColor',
    },
  },
  selectedItemColorClassName: {
    target: false,
    nativeStyleToProp: { color: 'selectedItemColor' },
  },
  todayContainerClassname: 'todayContainerStyle',
  timePickerContainerClassname: 'timePickerContainerStyle',
  timePickerTextClassname: 'timePickerTextStyle',
  timePickerIndicatorClassname: 'timePickerIndicatorStyle',
  monthContainerClassname: 'monthContainerStyle',
  yearContainerClassname: 'yearContainerStyle',
  weekDaysContainerClassname: 'weekDaysContainerStyle',
})

export const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <View className="rounded-medium bg-default-100">
      <StyledPicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date as Date)}
        timePicker
        calendarTextClassname="text-foreground"
        headerTextClassname="text-foreground"
        weekDaysTextClassName="text-foreground"
        headerButtonColorClassname="text-foreground"
        selectedItemColorClassName="text-primary"
        todayContainerClassname="border-primary"
        timePickerTextClassname="text-foreground"
        timePickerIndicatorClassname="bg-default-100"
        monthContainerClassname="bg-default-100 border-0"
        yearContainerClassname="bg-default-100 border-0"
        weekDaysContainerClassname="border-default-200"
      />
    </View>
  )
}
