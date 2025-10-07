import { PortalHost } from '@gorhom/portal'
import { type ProductType, store } from '@store'
import { useLocalSearchParams } from 'expo-router'
import { semanticColors } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { View } from 'react-native'

import {
  Container,
  Modal,
  ProductForm,
  ReceiptForm,
  ScannerButton,
} from '@components'
import { useTheme } from '@providers'

import { Header } from './header'
import { type ModalType, Receipt } from './receipt'

export const ReceiptDetails = observer(() => {
  const [modalType, setModalType] = useState<ModalType>('')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  )
  const { id } = useLocalSearchParams<{ id: string }>()
  const { current, isDark } = useTheme()

  const receipt = store.getReceiptById(id)!

  return (
    <Container
      backgroundColor={
        !isDark ? semanticColors[current].default[200] : undefined
      }
    >
      <Header onEdit={() => setModalType('receipt')} receiptId={id} />
      <Receipt
        receipt={receipt}
        openModal={() => setModalType('product')}
        selectProduct={setSelectedProduct}
      />
      <View className="mb-4">
        <ScannerButton type="barcode" id={id} />
      </View>

      {modalType ? (
        <Modal
          onClose={() => {
            setModalType('')
            setSelectedProduct(null)
          }}
        >
          {modalType === 'product' ? (
            <ProductForm
              receiptId={id}
              product={selectedProduct ?? undefined}
              onSubmit={() => setModalType('')}
            />
          ) : (
            <ReceiptForm receipt={receipt} onSubmit={() => setModalType('')} />
          )}
        </Modal>
      ) : null}

      <PortalHost name="popover-portal" />
    </Container>
  )
})
