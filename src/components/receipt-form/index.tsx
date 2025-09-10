import { Button, Checkbox, Input } from '@malberee/heroui-native'
import { type AddReceiptArg, type ReceiptType, store } from '@store'
import { Formik } from 'formik'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { DatePicker } from '../date-picker'
import { getSchema } from './schema'

interface ReceiptFormProps {
  receipt?: ReceiptType
  onSubmit: () => void
}

export const ReceiptForm: FC<ReceiptFormProps> = ({
  receipt,
  onSubmit: _onSubmit,
}) => {
  const { t } = useTranslation()

  const onSubmit = (receipt: AddReceiptArg) => {
    if (receipt?.id) {
      store.updateReceipt(receipt)
    } else {
      store.addReceipt(receipt)
    }
  }

  const initialValues = {
    amount: receipt?.amount ?? '',
    autoCalcAmount: receipt?.autoCalcAmount ?? true,
    date: receipt?.date ?? new Date(),
  }

  return (
    <View className="w-96 flex-col gap-4 pt-8">
      <Formik
        initialValues={{
          ...initialValues,
          amount: '',
        }}
        validationSchema={getSchema(!receipt)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={({ amount, autoCalcAmount, date }) => {
          onSubmit({
            amount: Number(amount || initialValues.amount),
            autoCalcAmount: autoCalcAmount ?? initialValues.autoCalcAmount,
            date: date || initialValues.date,
            id: receipt?.id,
          })
          _onSubmit()
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, errors, values }) => (
          <>
            <View className="flex-col gap-2">
              <Input
                size="lg"
                labelPlacement="inside"
                label={t('Amount')}
                placeholder={initialValues.amount.toString()}
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
                onValueChange={handleChange('amount')}
                value={values.amount}
                isInvalid={!!errors.amount}
                errorMessage={errors.amount}
                isDisabled={values.autoCalcAmount}
              />
              <Checkbox
                size="md"
                isInvalid={!!errors.autoCalcAmount}
                defaultSelected={initialValues.autoCalcAmount}
                onValueChange={(value) =>
                  setFieldValue('autoCalcAmount', value)
                }
                isSelected={values.autoCalcAmount}
              >
                {t('Auto calculate')}
              </Checkbox>
            </View>
            <DatePicker
              date={values.date}
              setDate={(date) => setFieldValue('date', date)}
            />
            <Button size="lg" onPress={() => handleSubmit()}>
              {t('Submit')}
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}
