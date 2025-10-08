import { MAX_DATA_POINTS } from './constants'
import type { DataItem } from './index'

export const normalizeData = (arr: DataItem[]): DataItem[] => {
  if (arr.length >= MAX_DATA_POINTS) return arr
  return [
    ...arr,
    ...Array(MAX_DATA_POINTS - arr.length).fill(arr[arr.length - 1]),
  ]
}
