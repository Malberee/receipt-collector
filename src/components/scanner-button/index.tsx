import { router } from 'expo-router'
import { cn } from 'merlo-ui'
import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'

import { useTheme } from '@providers'

import { BarcodeScan } from './barcode-scan'
import { QRCodeScan } from './qr-code-scan'

type ScannerButtonProps = { type: 'qr' } | { type: 'barcode'; id: string }

const QR_HREF = '/scanner/qr'
const BARCODE_HREF = '/scanner/barcode'

export const ScannerButton: FC<ScannerButtonProps> = (props) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { hasPermission, requestPermission } = useCameraPermission()

  const href = props.type === 'qr' ? QR_HREF : `${BARCODE_HREF}/${props.id}`

  const onPress = async () => {
    if (!hasPermission) {
      await requestPermission()
    }
    router.navigate(href)
  }

  const Icon = props.type === 'qr' ? QRCodeScan : BarcodeScan
  const text = props.type === 'qr' ? 'Scan QR Code' : 'Scan barcode'

  return (
    <Pressable
      className={cn(
        'grow rounded-large bg-[#d9eafd] active:bg-[#bfdbfa]',
        isDark && '!bg-[#171d26] active:!bg-[#14253b]',
      )}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center gap-2 rounded-large border-2 border-dashed border-primary px-3 py-6">
        <Icon className="text-primary" />
        <Text className="text-center text-xl text-primary">{t(text)}</Text>
      </View>
    </Pressable>
  )
}
