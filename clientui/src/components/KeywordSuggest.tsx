import React, { useState, useEffect } from "react";
import styled from "styled-components";

type SuggestListProps = {
  onSelect: (keyword: string) => void;
  keywords: string[];
};

const SuggestList: React.FC<SuggestListProps> = ({ keywords, onSelect }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const hanlder = (e: KeyboardEvent) => {
      if (e.keyCode === 40) {
        e.preventDefault();
        setIndex((index + 1) % keywords.length);
      } else if (e.keyCode === 38) {
        e.preventDefault();
        setIndex((index - 1 + keywords.length) % keywords.length);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        onSelect(keywords[index]);
      }
    };

    window.addEventListener("keydown", hanlder);
    return () => {
      window.removeEventListener("keydown", hanlder);
    };
  }, [keywords, index, onSelect]);

  return (
    <StyledSuggestList>
      {keywords.map((word, i) => (
        <li
          key={word}
          onMouseDown={() => onSelect(word)}
          className={i === index ? "index" : undefined}
        >
          {word}
        </li>
      ))}
    </StyledSuggestList>
  );
};

const StyledSuggestList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid lightgray;

  li {
    padding: 0.6em 0.4em;
    cursor: pointer;

    & + & {
      border-top: 1px solid lightgray;
    }

    &.index,
    &:hover {
      background-color: azure;
    }
  }
`;

type KeywordSuggestProps = {} & SuggestListProps;

export const KeywordSuggest: React.FC<KeywordSuggestProps> = ({
  children,
  keywords,
  onSelect,
}) => {
  const [active, setActive] = useState(false);
  const modifiedInput = React.cloneElement(children as any, {
    onBlur: () => {
      setActive(false);
    },
    onFocus: () => {
      setActive(keywords.length > 0);
    },
  });

  const handleSelect = (keyword: string) => {
    onSelect(keyword);
    setActive(false);
  };

  useEffect(() => {
    setActive(keywords.length > 0);
  }, [keywords.length]);

  return (
    <StyledWrapper>
      {modifiedInput}
      {active && <SuggestList keywords={keywords} onSelect={handleSelect} />}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
`;
