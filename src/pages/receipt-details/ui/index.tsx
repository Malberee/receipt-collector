import { useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import Dash from 'react-native-dashed-line'

import { ProductForm } from '@widgets/product-form'

import { Product } from '@entities/product'
import { type ProductType, receipts } from '@entities/receipt'

import { Modal, ScannerButton } from '@shared/ui'

import { Header } from './header'

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

export const ReceiptDetails = observer(() => {
  const [modalIsShow, setModalIsShow] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  )

  const { id } = useLocalSearchParams<{ id: string }>()

  const receipt = receipts.getReceiptById(id as string)!

  const { products } = receipt

  return (
    <>
      <View className="mb-28 overflow-hidden">
        <FlatList
          data={products}
          ListHeaderComponent={
            <Header
              receipt={receipt}
              setModalIsShow={() => setModalIsShow(true)}
              {...receipt}
            />
          }
          stickyHeaderIndices={[0]}
          keyExtractor={(item) => item.id}
          className="z-10 rounded-t-medium bg-default-200 dark:bg-default-100"
          renderItem={({ item }) => (
            <Product
              onPress={(product) => {
                setModalIsShow(true)
                setSelectedProduct(product)
              }}
              receiptId={id}
              product={item}
            />
          )}
        />
        <StyledDashedLine
          dashClassName="-translate-y-[7px] rotate-45 rounded-[2px] bg-default-200 dark:bg-default-100 z-0"
          dashLength={14}
          dashThickness={14}
        />
      </View>

      {modalIsShow ? (
        <Modal
          onClose={() => {
            setModalIsShow(false)
            setSelectedProduct(null)
          }}
        >
          <ProductForm
            receiptId={id}
            product={selectedProduct ?? undefined}
            onSubmit={() => setModalIsShow(false)}
          />
        </Modal>
      ) : null}

      <ScannerButton href={`/barcode-scanner/${id}`}>
        Scan barcode
      </ScannerButton>
    </>
  )
})
