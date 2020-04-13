import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { selectElement } from "../libs/dom-utils";

export const Usage: React.FC = () => {
  const [message, setMessage] = useState("");
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { protocol, host } = window.location;
    setMessage(`curl ${protocol}//${host}/v1/weather?city=<City>`);
  }, []);

  const handleClickCode = () => {
    if (codeRef.current) {
      selectElement(codeRef.current);
    }
  };

  return (
    <StyledMessage className="doc-message">
      You can call the API with `
      <code ref={codeRef} onClick={handleClickCode}>
        {message}
      </code>
      `
    </StyledMessage>
  );
};

const StyledMessage = styled.p`
  font-size: 0.8rem;
`;
