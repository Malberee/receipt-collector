import { PortalHost, PortalProvider } from '@gorhom/portal'
import { NextUIProvider } from '@malberee/nextui-native'
import { Slot } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useEffect, useLayoutEffect } from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { Container } from '@app/layouts'

import { receipts } from '@entities/receipt'

import { Toast as CustomToast } from '@shared/ui'

import '../global.css'

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
      <NextUIProvider>
        <PortalProvider>
          <SafeAreaView
            edges={['right', 'bottom', 'left']}
            className={`flex-1 bg-default-50 ${colorScheme}`}
          >
            <StatusBar
              barStyle={
                colorScheme === 'dark' ? 'light-content' : 'dark-content'
              }
              translucent
            />
            <Container>
              <Slot />
            </Container>
            <PortalHost name="modal-portal" />
            <Toast config={toastConfig} position="bottom" />
          </SafeAreaView>
        </PortalProvider>
      </NextUIProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayot
