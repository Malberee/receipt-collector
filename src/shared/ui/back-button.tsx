import { Button, ChevronDown } from '@malberee/heroui-native'
import { router } from 'expo-router'

export const BackButton = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="lg"
      color="default"
      className="mb-4"
      startContent={
        <ChevronDown
          className="text-foreground"
          width="24px"
          height="24px"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      }
      onPress={() => router.dismiss()}
    />
  )
}
