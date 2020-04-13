import React from "react";
import styled from "styled-components";

type ResponsePreviewProps = {
  response: any;
};

export const ResponsePreview: React.FC<ResponsePreviewProps> = ({
  response,
}) => (
  <aside className="result">
    <h3>Response</h3>
    {response && response.weather && response.weather.length > 0 && (
      <WeatherInfo weather={response.weather[0]} />
    )}
    <StyledCodeBlock>
      <code>
        <pre>{response ? JSON.stringify(response, null, 4) : "No Data"}</pre>
      </code>
    </StyledCodeBlock>
  </aside>
);

const StyledCodeBlock = styled.div`
  background: #f1f3f4;
  padding: 0.6em;
`;

type WeatherInfoProps = {
  weather: {
    main: string;
    description: string;
    icon: string;
  };
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => (
  <StyledWeatherInfo>
    It's {weather.description}
    <img
      key={weather.icon}
      src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      alt={weather.main}
    />
  </StyledWeatherInfo>
);

const StyledWeatherInfo = styled.div`
  font-size: 1.4rem;
  > img {
    width: 50px;
    vertical-align: middle;
  }
`;
