import { useContext } from 'react'

import { FiltersContext } from './with-filters'

export const useFilters = () => useContext(FiltersContext)
