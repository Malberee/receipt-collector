import { NextUIProvider } from '@malberee/nextui-native'
import { Slot, useSegments } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { Header } from '@app/layouts/header'

import { Toast as CustomToast } from '@shared/ui'

const toastConfig = {
  error: (props: BaseToastProps) => <CustomToast {...props} />,
}

function RootLayot() {
  const { colorScheme } = useColorScheme()
  const segments = useSegments()

  return (
    <GestureHandlerRootView>
      <NextUIProvider>
        <SafeAreaView
          edges={
            segments[0] === 'rarity' ? ['right', 'bottom', 'left'] : undefined
          }
          className={`flex-1 bg-default-50 ${colorScheme}`}
        >
          <StatusBar
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            translucent
          />
          {segments[0] !== 'rarity' ? <Header /> : null}
          <Slot />
          <Toast config={toastConfig} position="bottom" />
        </SafeAreaView>
      </NextUIProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayot
