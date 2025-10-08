import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import {
  type FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'

import { AnimatedPath } from './animated-path'
import { MAX_DATA_POINTS, SELECTED_POINT_RADIUS } from './constants'
import { Cursor } from './cursor'
import { DataPoint } from './data-point'
import { Defs } from './defs'
import { Grid } from './grid'
import { ChartContext, type ChartContextType } from './provider'
import { Tooltip } from './tooltip'
import { normalizeData } from './utils'

export type DataItem = {
  value: number
  date: Date
}

export interface ChartProps {
  data: DataItem[]
  colors: ChartContextType['colors']
  formatValue?: (value: number) => string
  formatDate?: (date: Date) => string
}

export const Chart: FC<ChartProps> = ({
  data: _data,
  colors,
  formatValue,
  formatDate,
}) => {
  const [data, setData] = useState<DataItem[]>(
    Array(MAX_DATA_POINTS).fill({ value: 0, date: new Date() }),
  )
  const [isMounted, setIsMounted] = useState(false)

  if (_data.length > MAX_DATA_POINTS) {
    throw Error(
      `The length of the data array must not exceed ${MAX_DATA_POINTS}!`,
    )
  }

  const [{ width, height }, setDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)

  const extractValue = (item: DataItem) => item.value

  const max =
    Math.max(
      ...(data.every((item) => item.value <= 0)
        ? _data.map(extractValue)
        : data.map(extractValue)),
    ) || 1

  const y = useCallback(
    scale
      .scaleLinear()
      .domain([0, max])
      .range([height - SELECTED_POINT_RADIUS, SELECTED_POINT_RADIUS]),
    [height, max],
  )
  const x = useCallback(
    scale
      .scaleLinear()
      .domain([0, _data.length - 1])
      .range([SELECTED_POINT_RADIUS, width - SELECTED_POINT_RADIUS]),
    [_data, width],
  )

  const lineFn = useCallback(
    shape
      .line<number>()
      .x((_, ix) => x(ix))
      .y((d) => y(d))
      .curve(shape.curveMonotoneX),
    [x, y],
  )
  const areaFn = useCallback(
    shape
      .area<number>()
      .x((_, ix) => x(ix))
      .y0(height)
      .y1((d) => y(d))
      .curve(shape.curveMonotoneX),
    [x, y],
  )

  const contextValue = useMemo<ChartContextType>(
    () => ({
      colors,
      width,
      height,
      x,
      y,
      min: 0,
      max,
    }),
    [
      colors.active,
      colors.default,
      colors.tooltipBackground,
      width,
      height,
      x,
      y,
      max,
    ],
  )

  const line = lineFn(data.map(extractValue))!
  const area = areaFn(data.map(extractValue))!

  useLayoutEffect(() => {
    setSelectedPoint(null)
    if (isMounted) setData(normalizeData(_data))
  }, [_data])

  useEffect(() => {
    if (width > 0 && height > 0) {
      setData(normalizeData(_data))
      if (!isMounted) setIsMounted(true)
    }
  }, [width, height])

  return (
    <ChartContext.Provider value={contextValue}>
      <View
        className="flex-1"
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout
          setDimensions({ width, height })
        }}
      >
        {width > 0 && height > 0 ? (
          <Svg
            width="100%"
            height="100%"
            onPressIn={() => setSelectedPoint(null)}
          >
            <Defs data={data} selectedPoint={selectedPoint} />
            <Grid numberOfPoints={data.length} />

            <Cursor selectedPoint={selectedPoint} />

            <AnimatedPath
              d={area}
              stroke="none"
              fill="url(#area-gradient)"
              clipPath="url(#grid-mask)"
            />
            <AnimatedPath
              d={line}
              fill="none"
              stroke={colors.default}
              clipPath="url(#points-mask)"
            />

            {data.map(({ value }, index) => (
              <DataPoint
                key={index}
                value={value}
                index={index}
                isSelected={selectedPoint === index}
                onSelect={setSelectedPoint}
              />
            ))}
          </Svg>
        ) : null}

        {selectedPoint !== null ? (
          <Tooltip
            data={data}
            formatValue={formatValue}
            formatDate={formatDate}
            selectedPoint={selectedPoint}
          />
        ) : null}
      </View>
    </ChartContext.Provider>
  )
}
