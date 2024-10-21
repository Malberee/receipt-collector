import { NextUIProvider } from '@malberee/nextui-native'
import { Slot } from 'expo-router'
import { cssInterop, useColorScheme } from 'nativewind'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@shared/ui'

const StyledStatusBar = cssInterop(StatusBar, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: 'barStyle',
    },
  },
})

function RootLayot() {
  const { colorScheme } = useColorScheme()

  return (
    <NextUIProvider>
      <SafeAreaView className={`flex-1 bg-default-50 ${colorScheme}`}>
        <StyledStatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Header />
        <Slot />
      </SafeAreaView>
    </NextUIProvider>
  )
}

export default RootLayot
