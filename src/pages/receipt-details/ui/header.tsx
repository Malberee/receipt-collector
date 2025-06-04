import { Button, ChevronDown } from '@malberee/heroui-native'
import { router } from 'expo-router'
import { View } from 'react-native'

export const Header = () => {
  return (
    <View className="z-10 w-full flex-row justify-between pb-4">
      <Button
        className="rotate-90"
        isIconOnly
        variant="light"
        size="lg"
        color="default"
        startContent={<ChevronDown color="white" width="24px" height="24px" />}
        onPress={() => router.navigate('../')}
      />
    </View>
  )
}
