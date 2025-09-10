import { cn } from '@malberee/heroui-native'
import { type ProductType, type ReceiptType, store } from '@store'
import { observer } from 'mobx-react-lite'
import { cssInterop, rem } from 'nativewind'
import React, { type FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, FlatList, type ListRenderItem, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import ZigzagLines from 'react-native-zigzag-lines'

import { DeleteDialog } from '@components'
import { useTheme } from '@providers'

import { Header } from './header'
import { Product } from './product'

interface ReceiptProps {
  receipt: ReceiptType
  openModal: () => void
  selectProduct: (product: ProductType) => void
}

export type ModalType = 'receipt' | 'product' | ''

cssInterop(FlatList, {
  className: {
    target: 'style',
  },
})

const StyledZigzagLines = cssInterop(ZigzagLines, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      backgroundColor: 'backgroundColor',
      color: 'color',
    },
  },
})

export const Receipt: FC<ReceiptProps> = observer(
  ({ receipt, openModal, selectProduct }) => {
    const { t } = useTranslation()
    const { isDark } = useTheme()
    const [productToDelete, setProductToDelete] = useState('')

    const renderItem = useCallback<ListRenderItem<ProductType>>(
      ({ item }) => (
        <Product
          onPress={(product) => {
            openModal()
            selectProduct(product)
          }}
          onDelete={setProductToDelete}
          receiptId={receipt.id}
          product={item}
        />
      ),
      [],
    )

    const zigzag = useMemo(
      () => (
        <StyledZigzagLines
          width={Dimensions.get('screen').width - rem.get() * 2}
          height={7}
          jagBottom={1}
          jagWidth={20}
          className={
            isDark
              ? 'bg-default-100 text-default-50'
              : 'bg-default-50 text-default-200'
          }
        />
      ),
      [],
    )

    return (
      <View className="mb-4 flex-1">
        <View className="max-h-full">
          <Header receipt={receipt} openModal={openModal} {...receipt} />
          <Animated.FlatList
            data={receipt.products}
            keyExtractor={(item) => item.id}
            className={cn(
              'z-10 max-h-full bg-default-50',
              isDark && '!bg-default-100',
            )}
            renderItem={renderItem}
            itemLayoutAnimation={LinearTransition}
            layout={LinearTransition}
          />
          <Animated.View layout={LinearTransition}>{zigzag}</Animated.View>
        </View>

        {productToDelete ? (
          <DeleteDialog
            text={t('Are you sure you want to delete the product?')}
            onCancel={() => setProductToDelete('')}
            onDelete={() => {
              setProductToDelete('')
              store.deleteProduct(receipt.id, productToDelete)
            }}
          />
        ) : null}
      </View>
    )
  },
)
