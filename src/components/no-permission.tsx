import { Button } from 'merlo-ui'
import { Linking, Text, View } from 'react-native'

import { DangerIcon } from '@icons'

export const NoPermission = () => {
  return (
    <View className="flex-1 flex-col items-center justify-center gap-4">
      <DangerIcon className="size-20 text-danger-600" />
      <Text className="text-center text-lg text-foreground">
        The app needs camera permission to scan.{'\n'}To give permission, go to
        settings
      </Text>
      <Button color="default" onPress={() => Linking.openSettings()}>
        Go to settings
      </Button>
    </View>
  )
}
