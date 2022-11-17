import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

const List = styled.ul.attrs(props => ({ className: props.className }))`
  background: ${(props) => props.theme.colors['black']};
  position: absolute;
  top: 9.2vh;
  width: 50.4%;
  left: 21.7%;
  border: 2px solid;
  border-radius: 4px;
  max-height: 45vh;
  overflow-y: scroll;
  z-index: 100;
`;
const Li = styled.li`
  color: ${(props) => props.theme.colors['theme-8']};
  padding: 10px;
  list-style-type:none;
  list-style-type: none;
  text-align-last: start;

  :hover,
  :focus {
    background:${(props) => props.theme.colors['dark-0']};
  }

  :focus {
    transform: scale(1.2) translateX(8%);
  }
`;

export const Results = ({ results, setSelected, className }) => {

  return (
    <List className={`${className} divide-y divide-dashed `} tabIndex={"0"}>
      {results.map((result, index) => (
        <Li tabIndex="0"
          key={index}
          onClick={() => {
            setSelected(result.matching_full_name.replaceAll(new RegExp("\\(\\w.+\\)$", "gi"), ""));
          }}
          onKeyPress={(e) => {
            e.key === 'Enter' && setSelected(result.matching_full_name.replaceAll(new RegExp("\\(\\w.+\\)$", "gi"), ""));
          }}
        >
          {result.matching_full_name}
        </Li>
      ))}
    </List>
  );
};
