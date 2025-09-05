import { observer } from 'mobx-react-lite'
import { type FC, type PropsWithChildren, createContext, useState } from 'react'

type DrawerContextType = {
  isShown: boolean
  show: () => void
  hide: () => void
}

export const DrawerContext = createContext<DrawerContextType>({
  isShown: false,
  show: () => {},
  hide: () => {},
})

export const DrawerProvider: FC<PropsWithChildren> = observer(
  ({ children }) => {
    const [isShown, setIsShown] = useState(false)

    return (
      <DrawerContext.Provider
        value={{
          isShown,
          show: () => setIsShown(true),
          hide: () => setIsShown(false),
        }}
      >
        {children}
      </DrawerContext.Provider>
    )
  },
)
