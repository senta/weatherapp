import React, { useState } from "react";

import { SuggestInput } from "./CitySuggest";
import styled from "styled-components";

type WeatherFormPorps = {
  onSearch: (message: string) => void;
  disable: boolean;
  errorMessage: string;
};

export const WeatherForm: React.FC<WeatherFormPorps> = ({
  onSearch,
  disable,
  errorMessage,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form id="form" action="#" autoComplete="off" onSubmit={handleSubmit}>
      <StyledFieled>
        <SuggestInput value={city} onChange={(value) => setCity(value)} />
        <StyledSubmitButton name="submit" type="submit" disabled={disable}>
          Check Weather
        </StyledSubmitButton>
      </StyledFieled>
      {errorMessage && (
        <StyledErrorMessage id="error-fieled" className="form-error">
          {errorMessage}
        </StyledErrorMessage>
      )}
    </form>
  );
};

const StyledSubmitButton = styled.button`
  appearance: none;
  padding: 0.6em;
  font: inherit;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #aeaeae;
  margin-left: 8px;
  background-color: #576ac7;
  color: white;
  position: relative;

  &:disabled {
    cursor: default;
  }
  &:disabled::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StyledFieled = styled.div`
  display: flex;
`;

const StyledErrorMessage = styled.p`
  color: #cd3b19;
`;
