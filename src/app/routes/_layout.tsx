import { PortalHost, PortalProvider } from '@gorhom/portal'
import { HeroUIProvider } from '@malberee/heroui-native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import React, { useEffect, useLayoutEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { Container } from '@app/layouts'

import { receipts } from '@entities/receipt'

import { Toast as CustomToast } from '@shared/ui'

import '../../../global.css'

configureReanimatedLogger({ strict: false })

const toastConfig = {
  error: (props: BaseToastProps) => <CustomToast {...props} />,
}

const RootLayot = () => {
  const { colorScheme, setColorScheme } = useColorScheme()

  useEffect(() => {
    receipts.setTheme(colorScheme)
  }, [colorScheme])

  useLayoutEffect(() => {
    setColorScheme(receipts.theme ?? 'dark')
  }, [])

  return (
    <GestureHandlerRootView>
      <HeroUIProvider>
        <PortalProvider>
          <SafeAreaView
            edges={['right', 'bottom', 'left']}
            className={`flex-1 bg-default-50 ${colorScheme}`}
          >
            <StatusBar
              style={colorScheme === 'dark' ? 'light' : 'dark'}
              translucent
            />
            <Container>
              <Slot />
            </Container>
            <PortalHost name="modal-portal" />
            <Toast config={toastConfig} position="bottom" />
          </SafeAreaView>
        </PortalProvider>
      </HeroUIProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayot
