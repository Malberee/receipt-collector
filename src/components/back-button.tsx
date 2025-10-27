import { router } from 'expo-router'
import { Button, ChevronDown } from 'merlo-ui'
import type { FC } from 'react'

interface BackButtonProps {
  iconClassName?: string
}

export const BackButton: FC<BackButtonProps> = ({
  iconClassName = 'text-foreground',
}) => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="lg"
      color="default"
      startContent={
        <ChevronDown
          className={iconClassName}
          width="24px"
          height="24px"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      }
      onPress={() => router.dismiss()}
    />
  )
}
