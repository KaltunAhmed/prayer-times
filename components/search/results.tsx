import styled from "styled-components";

const Ul = styled.ul.attrs(props => ({ className: props.className }))`
  background:black;
  position:absolute;
  top:9.2vh;
  width:50.4%;
  left:21.7%;
  border: 2px solid;
  border-radius:4px;
  max-height:45vh;
  overflow-y:scroll;
  z-index:100;
`
const Li = styled.li`
  color: white;
  padding: 10px;
  list-style-type:none;
  list-style-type: none;
  text-align-last: start;

  :hover {
    background: #00224e;
  }
`;

export const Results = ({ results, setSelected, className }) => {

  return (
    <Ul className={`${className} divide-y divide-dashed`}>
      {results.map((result, index) => (
        <Li
          key={index}
          onClick={(e) => {
            setSelected(result.matching_full_name.replaceAll(new RegExp("\\(\\w.+\\)$","gi"),""));
          }}
        >
          {result.matching_full_name}
        </Li>
      ))}
    </Ul>
  );
};
