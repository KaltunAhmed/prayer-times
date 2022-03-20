import styled from "styled-components";

// const styledInput = styled(input)``;
const Form = styled.div`
  position: relative;
  width: 100%;
`;
const Label = styled.label`
  background-color: #000e20;
  position: absolute;
  left: 1rem;
  top: 0.8rem;
  padding: 0 0.5rem;
  color: white;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
`;

const FormInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: inherit;
  padding: 1.25rem;
  background: none;
  color: white;

  &:hover {
    border-color: blue;
  }
  &:focus {
    border-color: teal;
  }

  &:focus ~ ${Label}, &:not(:placeholder-shown):not(:focus) ~ ${Label} {
    top: -0.5rem;
    font-size: 0.8rem;
    left: 0.8rem;
  }

`;
const FormWrapper = styled.div`
  display: flex;
  background:#000e20;
  padding:5% 0;
`;
const FormIcon = styled.div`
    font-size:2rem;    
`;

export const Input = ({ value, setValue, ...props }) => {
  return (
    <>
      <FormWrapper>
        {/* <FormIcon>🏙️</FormIcon> */}
        <Form>
          <FormInput
            type="text"
            id="search"
            autocomplete="off"
            value={value}
            placeholder=" "
            onChange={({ target }) => setValue(target.value)}
          />
          <Label htmlFor="search">YOUR CITY:</Label>
        </Form>
      </FormWrapper>
    </>
  );
};
