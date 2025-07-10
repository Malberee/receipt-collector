import { Button, Input } from '@malberee/heroui-native'
import { Formik } from 'formik'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import type { ProductType } from '@entities/receipt'

import { NoImageIcon } from '@shared/ui'

import { schema } from './config'
import { submitProduct, usePickImage } from './model'

interface ProductFormProps {
  product?: Partial<ProductType>
  receiptId: string
  onSubmit?: () => void
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

export const ProductForm: FC<ProductFormProps> = ({
  product,
  receiptId,
  onSubmit,
}) => {
  const { picture, name, price, quantity, id } = product ?? {}
  const { pictureSource, launchLibrary } = usePickImage(picture)

  return (
    <View className="w-96 flex-col gap-4 pt-8">
      <Pressable
        onPress={launchLibrary}
        className="h-80 w-full flex-row items-center justify-center rounded-medium bg-default-100/40 transition-colors active:bg-default-100/80"
      >
        {pictureSource ? (
          <Image
            source={{ uri: pictureSource }}
            resizeMode="contain"
            className="h-full w-full"
          />
        ) : (
          <View className="flex-col items-center justify-center">
            <NoImageIcon className="mb-2 size-16 text-default-200" />
            <Text className="text-default-400">Select image</Text>
          </View>
        )}
      </Pressable>
      <Formik
        initialValues={{
          name: name ?? '',
          quantity: quantity ?? 1,
          price: price ?? 0.0,
        }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          submitProduct({ picture: pictureSource, ...values }, receiptId, id)
          onSubmit?.()
        }}
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
                      errors.price ? 'text-danger-400' : 'text-foreground-400'
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
