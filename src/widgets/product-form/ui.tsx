import { Button, Input } from '@malberee/nextui-native'
import { Formik } from 'formik'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Text, View } from 'react-native'

import type { ProductType } from '@entities/receipt'

import { NoImageIcon } from '@shared/ui'

import { schema } from './config'
import { handleSubmit } from './model'

interface ProductFormProps {
  product: Omit<ProductType, 'id'>
  receiptId: string
}

cssInterop(NoImageIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
      width: true,
      height: true,
    },
  },
})

export const ProductForm: FC<ProductFormProps> = ({ product, receiptId }) => {
  const { picture, name } = product

  return (
    <View className="w-96 flex-col gap-4 pt-8">
      <View
        className={`h-80 w-full flex-row items-center justify-center rounded-medium ${!picture && 'bg-default-100/40'}`}
      >
        {picture ? (
          <Image
            source={{ uri: picture }}
            resizeMode="contain"
            className="h-full w-full"
          />
        ) : (
          <NoImageIcon className="size-16 text-default-200" />
        )}
      </View>
      <Formik
        initialValues={{ name, quantity: 1, price: 0.0 }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) =>
          handleSubmit({ picture: product?.picture, ...values }, receiptId)
        }
      >
        {({ handleSubmit, handleChange, initialValues, errors, values }) => (
          <>
            <Input
              size="lg"
              labelPlacement="inside"
              label="Name"
              onValueChange={handleChange('name')}
              defaultValue={initialValues.name}
              value={values.name}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
            />
            <View className="flex-row gap-4">
              <Input
                size="lg"
                fullWidth={false}
                labelPlacement="inside"
                label="Price"
                endContent={
                  <Text
                    className={
                      !!errors.price ? 'text-danger-400' : 'text-foreground-400'
                    }
                  >
                    UAH
                  </Text>
                }
                className="flex-1"
                onValueChange={handleChange('price')}
                defaultValue={initialValues.price.toString()}
                value={values.price.toString()}
                keyboardType="number-pad"
                isInvalid={!!errors.price}
                errorMessage={errors.price}
              />
              <Input
                size="lg"
                fullWidth={false}
                labelPlacement="inside"
                label="Quantity"
                className="flex-1"
                onValueChange={handleChange('quantity')}
                defaultValue={initialValues.quantity.toString()}
                value={values.quantity.toString()}
                keyboardType="number-pad"
                isInvalid={!!errors.quantity}
                errorMessage={errors.quantity}
              />
            </View>
            <Button onPress={() => handleSubmit()} size="lg">
              Submit
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}
