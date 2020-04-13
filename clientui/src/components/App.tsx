import React, { useState } from "react";
import styled from "styled-components";

import { currentWeather } from "../services/weather";
import { WeatherForm } from "./WeatherForm";
import { ResponsePreview } from "./ResponsePreview";
import { Usage } from "./Usage";

export const App: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (city: string) => {
    // validate tje value
    if (city === "") {
      setErrorMessage("City name is required");
      return;
    }
    setErrorMessage("");

    try {
      setLoading(true);

      const res = await currentWeather(city, "imperial");
      setResponse(res);
    } catch (err) {
      setResponse(null);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: Response) => {
    const _default_message = "Failed to load weather";

    if (Math.floor(err.status / 100) !== 4) {
      setErrorMessage(_default_message);
      return;
    }

    err.json().then((data) => {
      if (data.message.city) {
        setErrorMessage(data.message.city);
      } else {
        setErrorMessage(_default_message);
      }
    });
  };

  return (
    <Wrapper>
      <WeatherForm
        onSearch={handleSearch}
        errorMessage={errorMessage}
        disable={loading}
      />
      <Usage />
      <ResponsePreview response={response} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  margin: 0 auto;
  margin-top: 60px;
  max-width: 680px;
  @media screen and (max-width: 767px) {
    & {
      margin-top: 20px;
    }
  }
`;
