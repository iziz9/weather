import { useEffect, useState } from 'react'

const Clock = ({ timezone }: { timezone: string }) => {
  const [now, setNow] = useState('')

  useEffect(() => {
    const setClock = () => {
      const timeNow = new Date()
      const dateOptions = {
        timeZone: timezone,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const
      }
      const timeOptions = {
        timeZone: timezone,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        second: '2-digit' as const,
        hour12: false
      }
      const date = new Intl.DateTimeFormat('ko-KR', dateOptions).format(timeNow)
      const time = new Intl.DateTimeFormat('ko-KR', timeOptions).format(timeNow)
      setNow(`${date} ${time}`)
    }
    const intervalId = setInterval(setClock, 1000)

    return () => clearInterval(intervalId)
  }, [timezone])

  return <div>{now}</div>
}

export default Clock
