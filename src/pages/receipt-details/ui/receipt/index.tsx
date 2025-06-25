import { cssInterop } from 'nativewind'
import React, { type FC, useCallback } from 'react'
import { FlatList, type ListRenderItem, View } from 'react-native'
import Dash from 'react-native-dashed-line'

import { type ProductType, type ReceiptType } from '@entities/receipt'

import { useTheme } from '@shared/lib'

import { Header } from './header'
import { Product } from './product'

interface ReceiptProps {
  receipt: ReceiptType
  openModal: () => void
  closeModal: () => void
  selectProduct: (product: ProductType) => void
}

export type ModalType = 'receipt' | 'product' | ''

cssInterop(FlatList, {
  className: {
    target: 'style',
  },
})

const StyledDashedLine = cssInterop(Dash, {
  className: {
    target: 'style',
  },
  dashClassName: {
    target: 'dashStyle',
  },
})

export const Receipt: FC<ReceiptProps> = ({
  receipt,
  openModal,
  closeModal,
  selectProduct,
}) => {
  const { isDark } = useTheme()

  const renderItem = useCallback<ListRenderItem<ProductType>>(
    ({ item }) => (
      <Product
        onPress={(product) => {
          openModal()
          selectProduct(product)
        }}
        receiptId={receipt.id}
        product={item}
      />
    ),
    [],
  )

  return (
    <View className="mb-28 overflow-hidden">
      <FlatList
        data={receipt?.products}
        ListHeaderComponent={
          receipt ? (
            <Header receipt={receipt} openModal={openModal} {...receipt} />
          ) : null
        }
        stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.id}
        className={`z-10 rounded-t-medium bg-default-200 ${isDark && '!bg-default-100'}`}
        renderItem={renderItem}
      />
      <StyledDashedLine
        dashClassName={`-translate-y-[7px] rotate-45 rounded-[2px] bg-default-200 ${isDark && '!bg-default-100'} z-0`}
        dashLength={14}
        dashThickness={14}
      />
    </View>
  )
}
