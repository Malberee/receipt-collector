import { store } from '@store'
import { reaction } from 'mobx'
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ComponentType,
} from 'react'

import type { Rarity } from '@constants'

import { getFilters } from './utils'

type RangeFilter<T> = {
  from: T
  to: T
}

export type FiltersType = {
  amount: RangeFilter<number>
  date: RangeFilter<Date>
  rarities: Rarity[]
}

type Overload = {
  (key: 'amount', value: FiltersType['amount']): void
  (key: 'date', value: FiltersType['date']): void
  (key: 'rarities', value: FiltersType['rarities']): void
}

type FiltersContextType = {
  initialFilters: FiltersType
  filters: FiltersType
  hasFilters: boolean
  onValueChange: Overload
}

export const FiltersContext = createContext<FiltersContextType>(
  {} as FiltersContextType,
)

export const withFilters = <T extends object>(
  WrappedComponent: ComponentType<T>,
): ComponentType<T> => {
  return (props: T) => {
    const [initialFilters, setInitialFilters] = useState(
      getFilters(store.receipts),
    )
    const [filters, setFilters] = useState(getFilters(store.receipts))
    const [hasFilters, setHasFilters] = useState(false)

    useLayoutEffect(() => {
      const { amount, date, rarities } = filters
      const { amount: initialAmount, date: initialDate } = initialFilters

      setHasFilters(
        amount.from !== initialAmount.from ||
          amount.to !== initialAmount.to ||
          date.from.getTime() !== initialDate.from.getTime() ||
          date.to.getTime() !== initialDate.to.getTime() ||
          rarities.length > 0,
      )
    }, [filters])

    useEffect(() => {
      const dispose = reaction(
        () => [...store.receipts],
        () => {
          const newFilters = getFilters(store.receipts)

          setInitialFilters(newFilters)
          setFilters(newFilters)
        },
      )

      return () => dispose()
    }, [])

    return (
      <FiltersContext.Provider
        value={{
          initialFilters,
          filters,
          hasFilters,
          onValueChange: (key, value) =>
            setFilters((prevState) => ({ ...prevState, [key]: value })),
        }}
      >
        <WrappedComponent {...props} />
      </FiltersContext.Provider>
    )
  }
}
