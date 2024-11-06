import { Button, Input } from '@malberee/nextui-native'
import { Formik } from 'formik'
import React, { type FC, useState } from 'react'
import { Text, View } from 'react-native'

import { type ReceiptType } from '@entities/receipt'

import { schema } from '../config'
import { handleSubmit } from '../model'
import { DatePicker } from './DatePicker'

interface ReceiptFormProps {
  receipt?: ReceiptType
  onSubmit?: () => void
}

export const ReceiptForm: FC<ReceiptFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <View className="w-96 flex-col gap-4 pt-8">
      <Formik
        initialValues={{ amount: 0 }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          handleSubmit({ ...values, date })
          onSubmit?.()
        }}
      >
        {({ handleSubmit, handleChange, initialValues, errors, values }) => (
          <>
            <Input
              size="lg"
              labelPlacement="inside"
              label="Amount"
              keyboardType="number-pad"
              endContent={
                <Text
                  className={
                    errors.amount ? 'text-danger-400' : 'text-foreground-400'
                  }
                >
                  UAH
                </Text>
              }
              defaultValue={initialValues.amount.toString()}
              onValueChange={handleChange('amount')}
              value={values.amount.toString()}
              isInvalid={!!errors.amount}
              errorMessage={errors.amount}
            />
            <DatePicker date={date} setDate={setDate} />
            <Button size="lg" onPress={() => handleSubmit()}>
              Submit
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}
