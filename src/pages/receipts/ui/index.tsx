import React from 'react'
import { useSharedValue } from 'react-native-reanimated'

import { FilterReceipts } from '@features/filter-receipts'

import { ScannerButton } from '@shared/ui'

import { Header } from './header'
import { ReceiptList } from './receipt-list'

export const Receipts = () => {
  const isExpanded = useSharedValue(false)

  return (
    <>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      <FilterReceipts isExpanded={isExpanded} />
      <ReceiptList />
      <ScannerButton href="/scanner/qr">Scan QR</ScannerButton>
    </>
  )
}
