import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React, { type FC, useCallback } from 'react'
import { FlatList, type ListRenderItem, View } from 'react-native'
import Dash from 'react-native-dashed-line'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { type ProductType, type ReceiptType, receipts } from '@entities/receipt'

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

export const Receipt: FC<ReceiptProps> = observer(
  ({ receipt, openModal, closeModal, selectProduct }) => {
    const { isDark } = useTheme()

    const renderItem = useCallback<ListRenderItem<ProductType>>(
      ({ item }) => (
        <Product
          onPress={(product) => {
            openModal()
            selectProduct(product)
          }}
          onDelete={(id) => receipts.deleteProduct(receipt.id, id)}
          receiptId={receipt.id}
          product={item}
        />
      ),
      [],
    )

    return (
      <View className="mb-28 flex-1">
        <View className="max-h-full">
          <Header receipt={receipt} openModal={openModal} {...receipt} />
          <Animated.FlatList
            data={receipt?.products}
            keyExtractor={(item) => item.id}
            className={`z-10 max-h-full bg-default-200 ${isDark && '!bg-default-100'}`}
            renderItem={renderItem}
            itemLayoutAnimation={LinearTransition}
            layout={LinearTransition}
          />
          <Animated.View
            className="w-full overflow-hidden"
            layout={LinearTransition}
          >
            <StyledDashedLine
              dashClassName={`-translate-y-[7px] rotate-45 rounded-[2px] bg-default-200 ${isDark && '!bg-default-100'} z-0`}
              dashLength={14}
              dashThickness={14}
            />
          </Animated.View>
        </View>
      </View>
    )
  },
)
