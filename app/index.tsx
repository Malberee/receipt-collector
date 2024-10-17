import '../global.css'
import { Button } from '@malberee/nextui-native'
import { useCameraPermissions } from 'expo-camera'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [permission, requestPermission] = useCameraPermissions()

  const isPermissionGranted = permission?.granted

  return (
    <View className="bg-default-50 dark" style={styles.container}>
      <Button onPress={requestPermission}>Request permissions</Button>
      <Link href="/scanner" asChild>
        <Button isDisabled={!isPermissionGranted}>Scanner</Button>
      </Link>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
