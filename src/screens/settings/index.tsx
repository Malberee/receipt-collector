import { PortalHost } from '@gorhom/portal'
import { Button } from 'merlo-ui'

import { Container } from '@components'
import { MenuIcon } from '@icons'
import { useDrawer } from '@providers'

import { SettingList } from './setting-list'

export const Settings = () => {
  const { show } = useDrawer()

  return (
    <Container>
      <Button
        isIconOnly
        size="lg"
        variant="light"
        color="default"
        startContent={
          <MenuIcon className="text-foreground" width={28} height={28} />
        }
        className="mb-4 ml-auto"
        onPress={show}
      />
      <SettingList />

      <PortalHost name="select-portal" />
    </Container>
  )
}
