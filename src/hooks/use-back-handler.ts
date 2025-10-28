import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export const useBackHandler = (onBack: () => void) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBack()
        return true
      },
    )

    return () => backHandler.remove()
  }, [])
}
