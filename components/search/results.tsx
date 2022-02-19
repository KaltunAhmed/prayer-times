import styled from "styled-components";

const Li = styled.li`
  background: black;
  color: green;
  margin: 5px;
  padding: 5px;
`;

export const Results = ({ results, setSelected }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <Li
          key={index}
          onClick={(e) => {
            setSelected(result);
          }}
        >
          {result}
        </Li>
      ))}
    </ul>
  );
};
