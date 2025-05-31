import { Button } from '@malberee/heroui-native'
import moment, { type Moment } from 'moment'
import React, { type FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { receipts } from '@entities/receipt'

import { DatePicker, Modal } from '@shared/ui'

import { getMinMaxDates } from '../lib'

type ModalType = 'start' | 'end' | 'none'

interface DateRangePickerProps {
  onValueChange: (value: [Date, Date]) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  onValueChange,
}) => {
  const { minDate, maxDate } = getMinMaxDates()

  const formatDate = (date: Moment | Date) =>
    moment(date).format('DD.MM.YYYY [ • ] HH:mm')

  const [startDate, setStartDate] = useState<Date>(minDate.toDate())
  const [endDate, setEndDate] = useState<Date>(maxDate.toDate())
  const [modalType, setModalType] = useState<ModalType>('none')

  const dates = {
    start: { value: startDate, setState: setStartDate },
    end: { value: endDate, setState: setEndDate },
  }

  useEffect(() => {
    const { minDate, maxDate } = getMinMaxDates()

    setStartDate(minDate.toDate())
    setEndDate(maxDate.toDate())
  }, [JSON.stringify(receipts.receipts)])

  return (
    <View>
      <View className="mb-0.5 flex-row gap-16">
        <Text className="flex-1 text-center text-foreground">Start</Text>
        <Text className="flex-1 text-center text-foreground">End</Text>
      </View>
      <View className="flex-row items-center justify-center gap-4">
        <Button
          className="flex-1"
          variant="flat"
          color="default"
          onPress={() => setModalType('start')}
        >
          {formatDate(startDate)}
        </Button>
        <View className="h-0.5 w-8 bg-default-100" />
        <Button
          className="flex-1"
          variant="flat"
          color="default"
          onPress={() => setModalType('end')}
        >
          {formatDate(endDate)}
        </Button>
      </View>

      {modalType !== 'none' ? (
        <Modal
          onClose={() => {
            setModalType('none')
            onValueChange([startDate, endDate])
          }}
        >
          <View className="w-96">
            <Text className="mb-4 text-2xl capitalize text-foreground">
              {modalType}
            </Text>
            <DatePicker
              date={dates[modalType].value}
              setDate={(value) => {
                dates[modalType].setState(new Date(value))
              }}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  )
}
