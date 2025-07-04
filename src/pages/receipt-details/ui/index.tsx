import { PortalHost } from '@gorhom/portal'
import { useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import { ProductForm } from '@features/product-create-edit'
import { ReceiptForm } from '@features/receipt-create-edit'

import { type ProductType, receipts } from '@entities/receipt'

import { Modal, ScannerButton } from '@shared/ui'

import { Header } from './header'
import { type ModalType, Receipt } from './receipt'

export const ReceiptDetails = observer(() => {
  const [modalType, setModalType] = useState<ModalType>('')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  )
  const { id } = useLocalSearchParams<{ id: string }>()
  const receipt = receipts.getReceiptById(id)!

  return (
    <>
      <Header onEdit={() => setModalType('receipt')} receiptId={id} />
      <Receipt
        receipt={receipt}
        openModal={() => setModalType('product')}
        closeModal={() => {
          setModalType('')
          setSelectedProduct(null)
        }}
        selectProduct={setSelectedProduct}
      />
      <ScannerButton href={`/scanner/barcode/${id}`}>
        Scan barcode
      </ScannerButton>

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
    </>
  )
})
