import type { ScaleLinear } from 'd3-scale'
import { createContext, useContext } from 'react'

export type ChartContextType = {
  width: number
  height: number
  x: ScaleLinear<number, number, never>
  y: ScaleLinear<number, number, never>
  min: number
  max: number
  colors: {
    default: string
    active: string
    tooltipBackground: string
  }
}

export const ChartContext = createContext<ChartContextType>(
  {} as ChartContextType,
)

export const useChart = () => useContext(ChartContext)
