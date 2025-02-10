import { useEffect, useState } from 'react'

const Clock = () => {
  const [now, setNow] = useState('')

  useEffect(() => {
    const setClock = () => {
      const timeNow = new Date()
      const date = timeNow.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
      const hours = timeNow.getHours().toString().padStart(2, '0')
      const minutes = timeNow.getMinutes().toString().padStart(2, '0')
      const seconds = timeNow.getSeconds().toString().padStart(2, '0')

      const timeString = `${date} ${hours}:${minutes}:${seconds}`
      setNow(timeString)
    }

    const intervalId = setInterval(setClock, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return <div>{now}</div>
}

export default Clock
