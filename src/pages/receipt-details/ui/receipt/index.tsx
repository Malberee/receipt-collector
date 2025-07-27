import { cn } from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React, { type FC, useCallback, useState } from 'react'
import { FlatList, type ListRenderItem, View } from 'react-native'
import Dash from 'react-native-dashed-line'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { type ProductType, type ReceiptType, receipts } from '@entities/receipt'

import { useTheme } from '@shared/lib'
import { DeleteDialog } from '@shared/ui'

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

const StyledDashedLine = cssInterop(Dash, {
  className: {
    target: 'style',
  },
  dashClassName: {
    target: 'dashStyle',
  },
})

export const Receipt: FC<ReceiptProps> = observer(
  ({ receipt, openModal, selectProduct }) => {
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

    return (
      <View className="mb-28 flex-1">
        <View className="max-h-full">
          <Header receipt={receipt} openModal={openModal} {...receipt} />
          <Animated.FlatList
            data={receipt?.products}
            keyExtractor={(item) => item.id}
            className={cn(
              'z-10 max-h-full bg-default-200',
              isDark && '!bg-default-100',
            )}
            renderItem={renderItem}
            itemLayoutAnimation={LinearTransition}
            layout={LinearTransition}
          />
          <Animated.View
            className="w-full overflow-hidden"
            layout={LinearTransition}
          >
            <StyledDashedLine
              dashClassName={cn(
                '-translate-y-[7px] rotate-45 rounded-[2px] bg-default-200 z-0',
                isDark && '!bg-default-100',
              )}
              dashLength={14}
              dashThickness={14}
            />
          </Animated.View>
        </View>

        {productToDelete ? (
          <DeleteDialog
            text="Are you sure you want to delete the product?"
            onCancel={() => setProductToDelete('')}
            onDelete={() => {
              setProductToDelete('')
              receipts.deleteProduct(receipt.id, productToDelete)
            }}
          />
        ) : null}
      </View>
    )
  },
)
