import { router } from 'expo-router'
import { Button, ChevronDown } from 'merlo-ui'

export const BackButton = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="lg"
      color="default"
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
