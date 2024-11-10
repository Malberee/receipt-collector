import React from 'react'

import { ReceiptList } from '@widgets/receipt-list'

import { ScannerButton } from '@shared/ui'

export const Receipts = () => {
  return (
    <>
      <ReceiptList />
      <ScannerButton href="/qr-scanner">Scan QR</ScannerButton>
    </>
  )
}
