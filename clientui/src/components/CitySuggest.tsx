import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

import { searchCities } from "../services/weather";
import { KeywordSuggest } from "./KeywordSuggest";

type SuggestInputPorps = {
  value: string;
  onChange: (selected: string) => void;
};
export const SuggestInput: React.FC<SuggestInputPorps> = ({
  value,
  onChange,
}) => {
  const [candidates, setCandidates] = useState<string[]>([]);

  const debouncedSearchCities = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value) {
          return;
        }
        const candidates = await searchCities(value);
        setCandidates(candidates);
      }, 120),
    []
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onChange(value);
    debouncedSearchCities(value);
    if (!value) {
      setCandidates([]);
    }
  };

  return (
    <StyledWrapper>
      <KeywordSuggest keywords={candidates} onSelect={onChange}>
        <StyledInput value={value} onChange={handleChange} />
      </KeywordSuggest>
    </StyledWrapper>
  );
};

const StyledInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  padding: 0.6em;
  border-radius: 4px;
  border: 1px solid #aeaeae;
  font: inherit;
  width: 100%;
`;

const StyledWrapper = styled.div`
  flex: 1;
`;
