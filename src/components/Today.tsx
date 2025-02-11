import styled from 'styled-components'
import { roundingOff } from '../utils/weatherUtils'
import Clock from './Clock'

const Today = ({ currentTemp, timezone }: { currentTemp: number; timezone: string }) => {
  return (
    <Container>
      <Clock timezone={timezone} />
      <span className="temp">{roundingOff(currentTemp, true)}°</span>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  height: 150px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid white;

  .temp {
    font-size: 60px;
    font-weight: 700;
    color: white;
  }
`
export default Today
