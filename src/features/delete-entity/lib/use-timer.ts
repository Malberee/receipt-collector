import { useEffect, useState } from 'react'

export const useTimer = (onTimeIsUp: () => void, initialValue?: number) => {
  const [timerCount, setTimer] = useState(initialValue ?? 5)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount === 0) {
          clearInterval(interval)
          return 0
        } else {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    timerCount === 0 && onTimeIsUp()
  }, [timerCount])

  return timerCount
}
