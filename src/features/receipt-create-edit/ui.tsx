import { Button, Checkbox, Input } from '@malberee/heroui-native'
import { Formik } from 'formik'
import React, { type FC, useState } from 'react'
import { Text, View } from 'react-native'

import { type ReceiptType } from '@entities/receipt'

import { DatePicker } from '@shared/ui'

import { schema } from './config'
import { submitReceipt } from './model'

interface ReceiptFormProps {
  receipt?: ReceiptType
  onSubmit: () => void
}

export const ReceiptForm: FC<ReceiptFormProps> = ({ receipt, onSubmit }) => {
  const [date, setDate] = useState<Date>(receipt?.date ?? new Date())

  return (
    <View className="w-96 flex-col gap-4 pt-8">
      <Formik
        initialValues={{
          amount: receipt?.amount ?? 0,
          autoCalcAmount: receipt?.autoCalcAmount ?? true,
        }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          submitReceipt({
            ...values,
            date,
            id: receipt?.id,
          })
          onSubmit()
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          initialValues,
          errors,
          values,
        }) => (
          <>
            <View className="flex-col gap-2">
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
                isDisabled={values.autoCalcAmount}
              />
              <Checkbox
                size="md"
                defaultSelected={initialValues.autoCalcAmount}
                onValueChange={(value) =>
                  setFieldValue('autoCalcAmount', value)
                }
                value={values.autoCalcAmount.toString()}
              >
                Auto calculate amount based on products price
              </Checkbox>
            </View>
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
