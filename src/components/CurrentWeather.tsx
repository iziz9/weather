import styled from 'styled-components'

const CurrentWeather = () => {
  return (
    <CurrentContainer>
      <div>현재 날씨 정보</div>
    </CurrentContainer>
  )
}

const CurrentContainer = styled.section`
  height: 250px;
  background-color: darkkhaki;
`

export default CurrentWeather
