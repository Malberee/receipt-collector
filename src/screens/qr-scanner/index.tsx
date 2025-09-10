import { store } from '@store'
import { router } from 'expo-router'
import i18n from 'i18next'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Camera } from 'react-native-vision-camera'

import { NoPermission, ScannerOverlay } from '@components'
import { useScanner } from '@hooks'

import { parseQR } from './utils'

export const QRScanner = () => {
  const addReceipt = (data: string) => {
    try {
      const receipt = parseQR(data)

      store.addReceipt(receipt)

      router.replace({
        pathname: 'rarity',
        params: { rarity: receipt.rarity, id: receipt.id },
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('Error'),
        text2: error as string,
      })
    }
  }

  const { hasPermission, cameraProps, hasTorch, toggleTorch } = useScanner(
    'qr',
    true,
    addReceipt,
  )

  return (
    <>
      {hasPermission ? (
        <View className="relative flex-1">
          <Camera {...cameraProps} style={{ flex: 1 }} />
          <ScannerOverlay
            type="qr"
            hasTorch={hasTorch}
            toggleTorch={toggleTorch}
          />
        </View>
      ) : (
        <NoPermission />
      )}
    </>
  )
}
