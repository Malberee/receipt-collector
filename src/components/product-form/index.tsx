import { Button, Input } from '@malberee/heroui-native'
import { type ProductType, receipts } from '@store'
import { Formik } from 'formik'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import { NoImageIcon } from '@icons'

import { getSchema } from './schema'
import { usePickImage } from './use-pick-image'

interface ProductFormProps {
  product?: Partial<ProductType>
  receiptId: string
  onSubmit: () => void
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
  onSubmit: _onSubmit,
}) => {
  const { picture, name, price, quantity, id } = product ?? {}
  const { pictureSource, launchLibrary } = usePickImage(picture)

  const onSubmit = (product: Omit<ProductType, 'id'>) => {
    if (id) {
      receipts.updateProduct(receiptId, id, product)
    } else {
      receipts.addProduct(receiptId, product)
    }

    _onSubmit()
  }

  const initialValues = {
    name: name ?? '',
    quantity: quantity ?? '',
    price: price ?? '',
  }

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
          name: '',
          quantity: quantity === undefined ? '1' : '',
          price: price === undefined ? '0' : '',
        }}
        validationSchema={getSchema(!product)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={({ name, price, quantity }) => {
          onSubmit({
            picture: pictureSource,
            name: name || initialValues.name,
            price: Number(price || initialValues.price),
            quantity: Number(quantity || initialValues.price),
          })
        }}
      >
        {({ handleSubmit, handleChange, errors, values }) => (
          <>
            <Input
              size="lg"
              labelPlacement="inside"
              label="Name"
              placeholder={initialValues.name.toString()}
              onValueChange={handleChange('name')}
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
                placeholder={initialValues.price.toString()}
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
                value={values.price}
                keyboardType="number-pad"
                isInvalid={!!errors.price}
                errorMessage={errors.price}
              />
              <Input
                size="lg"
                fullWidth={false}
                labelPlacement="inside"
                label="Quantity"
                placeholder={initialValues.quantity.toString()}
                className="flex-1"
                onValueChange={handleChange('quantity')}
                defaultValue={initialValues.quantity}
                value={values.quantity}
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
