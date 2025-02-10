import styled from 'styled-components'

const HourlyWeather = () => {
  return (
    <HourlyContainer>
      <div>
        <div>시간별 날씨 정보</div>
      </div>
    </HourlyContainer>
  )
}

const HourlyContainer = styled.section`
  height: 250px;
  background-color: aquamarine;
`

export default HourlyWeather
