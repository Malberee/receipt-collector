import { NextUIProvider } from '@malberee/nextui-native'
import { Slot } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@app/layouts/header'

function RootLayot() {
  const { colorScheme } = useColorScheme()

  return (
    <NextUIProvider>
      <SafeAreaView className={`flex-1 bg-default-50 ${colorScheme}`}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Header />
        <Slot />
      </SafeAreaView>
    </NextUIProvider>
  )
}

export default RootLayot
