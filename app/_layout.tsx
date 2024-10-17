import { NextUIProvider } from '@malberee/nextui-native'
import { Slot } from 'expo-router'

const RootLayot = () => {
  return (
    <NextUIProvider>
      <Slot />
    </NextUIProvider>
  )
}

export default RootLayot
