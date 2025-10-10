import { Button } from 'merlo-ui'
import moment, { type Moment } from 'moment'
import React, { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { DatePicker, Modal } from '@components'

type ModalType = 'start' | 'end' | 'none'

interface DateRangePickerProps {
  min: number
  max: number
  onValueChange: (value: [Date, Date]) => void
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  min,
  max,
  onValueChange,
}) => {
  const { t } = useTranslation()

  const formatDate = (date: Moment | Date) =>
    moment(date).format('DD.MM.YYYY [ • ] HH:mm')

  const [startDate, setStartDate] = useState<Date>(new Date(min))
  const [endDate, setEndDate] = useState<Date>(new Date(max))
  const [modalType, setModalType] = useState<ModalType>('none')

  const dates = {
    start: { value: startDate, setState: setStartDate },
    end: { value: endDate, setState: setEndDate },
  }

  useEffect(() => {
    setStartDate(new Date(min))
    setEndDate(new Date(max))
  }, [min, max])

  return (
    <View>
      <View className="mb-0.5 flex-row gap-16">
        <Text className="flex-1 text-center capitalize text-foreground">
          {t('start')}
        </Text>
        <Text className="flex-1 text-center capitalize text-foreground">
          {t('end')}
        </Text>
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
        <Modal onClose={() => setModalType('none')}>
          <View className="w-96">
            <Text className="mb-4 text-2xl capitalize text-foreground">
              {t(modalType)}
            </Text>
            <DatePicker
              date={dates[modalType].value}
              setDate={(value) => {
                dates[modalType].setState(new Date(value))
                if (modalType === 'start') {
                  onValueChange([value, endDate])
                } else {
                  onValueChange([startDate, value])
                }
                setModalType('none')
              }}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  )
}
