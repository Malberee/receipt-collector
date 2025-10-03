import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import { type FC, useEffect, useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'

import { AnimatedPath } from './animated-path'
import { SELECTED_POINT_RADIUS } from './constants'
import { Cursor } from './cursor'
import { DataPoint } from './data-point'
import { Defs } from './defs'
import { Grid } from './grid'
import { Tooltip } from './tooltip'

type DataItem = {
  value: number
  date: Date
}

export interface ChartProps {
  data: DataItem[]
  colors: {
    default: string
    active: string
    tooltipBackground: string
  }
  formatValue?: (value: number) => string
  formatDate?: (date: Date) => string
}

export type ExtraProps = {
  width: number
  height: number
  x: scale.ScaleLinear<number, number, never>
  y: scale.ScaleLinear<number, number, never>
  min: number
  max: number
  selectedPoint: number | null
} & ChartProps

export const Chart: FC<ChartProps> = ({
  data: _data,
  colors,
  formatValue,
  formatDate,
}) => {
  const MAX_DATA_POINTS = 7

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
  const [selectedPoint, setSelectedPoint] =
    useState<ExtraProps['selectedPoint']>(null)

  const extractValue = (item: DataItem) => item.value

  const max =
    Math.max(
      ...(data.every((item) => item.value <= 0)
        ? _data.map(extractValue)
        : data.map(extractValue)),
    ) || 1

  const y = scale
    .scaleLinear()
    .domain([0, max])
    .range([height - SELECTED_POINT_RADIUS, SELECTED_POINT_RADIUS])
  const x = scale
    .scaleLinear()
    .domain([0, _data.length - 1])
    .range([SELECTED_POINT_RADIUS, width - SELECTED_POINT_RADIUS])

  const lineFn = shape
    .line<number>()
    .x((_, ix) => x(ix))
    .y((d) => y(d))
    .curve(shape.curveMonotoneX)
  const areaFn = shape
    .area<number>()
    .x((_, ix) => x(ix))
    .y0(height)
    .y1((d) => y(d))
    .curve(shape.curveMonotoneX)

  const line = lineFn(data.map(extractValue))!
  const area = areaFn(data.map(extractValue))!

  const extraProps: ExtraProps = {
    data,
    colors,
    width,
    height,
    x,
    y,
    min: 0,
    max,
    selectedPoint,
  }

  const getNormalizedData = (arr: DataItem[]): DataItem[] => {
    if (arr.length >= MAX_DATA_POINTS) return arr
    return [
      ...arr,
      ...Array(MAX_DATA_POINTS - arr.length).fill(arr[arr.length - 1]),
    ]
  }

  useLayoutEffect(() => {
    setSelectedPoint(null)
    if (isMounted) setData(getNormalizedData(_data))
  }, [_data])

  useEffect(() => {
    if (width > 0 && height > 0) {
      setData(getNormalizedData(_data))
    }
    if (!isMounted) setIsMounted(true)
  }, [width, height])

  return (
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
          <Defs {...extraProps} />
          <Grid {...extraProps} />

          <Cursor {...extraProps} />

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
              onSelect={setSelectedPoint}
              {...extraProps}
            />
          ))}
        </Svg>
      ) : null}

      {selectedPoint !== null ? (
        <Tooltip
          {...extraProps}
          formatValue={formatValue}
          formatDate={formatDate}
          selectedPoint={selectedPoint}
        />
      ) : null}
    </View>
  )
}
