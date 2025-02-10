import styled from 'styled-components'

const WeeklyWeather = () => {
  return (
    <WeeklyContainer>
      <div>주간 날씨정보</div>
    </WeeklyContainer>
  )
}

const WeeklyContainer = styled.section`
  height: 250px;
  background-color: burlywood;
`

export default WeeklyWeather
