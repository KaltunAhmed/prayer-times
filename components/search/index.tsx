import React, { useEffect, useState } from "react";
import { Results } from "./results";
import styled from "styled-components";

const Container = styled.div.attrs(props => ({ className: props.className }))`
  position:relative;
  justify-content:center;
  align-items:center;
  display:flex;
  width: 100%;
  height:10vh;
  background: ${(props) => props.theme.colors['dark-0']};

`;
const SearchInput = styled.input.attrs(props => ({ className: props.className }))`
    border-radius: 4px;
    background: ${(props) => props.theme.colors["black"]};
    width:100%;
    color:  ${(props) => props.theme.colors["theme-8"]};
    padding: 0 1%;
    box-shadow: 0px 0px 0px 3px  ${(props) => props.theme.colors["theme-8"]};
    
    height: 50%;
    justify-self: center;
    margin: 0;
`;

const Form = styled.form.attrs(props => ({ className: props.className }))`
    width:100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    position:relative;

    input {
      padding-right: 100px;
    }
`;

const Button = styled.button.attrs(props => ({ className: props.className }))`
    padding: 1%;
    background:  ${(props) => props.theme.colors["theme-2"]};
    color: ${(props) => props.theme.colors["theme-8"]};
    height: 45%;
    position: absolute;
    right:2.5px;
    text-align: center;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    display: flex;
`;
const Wrapper = styled.div.attrs(props => ({ className: props.className }))`
  position: relative;
  height:100%;

  ul {
    position: absolute;
    right:0;
    left:0;
    top: 85%;
    width:100%;
    max-height: 40vh;
    border-radius: 0 0 14px 14px;
    background: ${(props) => props.theme.colors['dark-1']};
    box-shadow: 0px 4px 8px 1px  ${(props) => props.theme.colors["theme-2"]};
    text-align:left;
    overflow-x:hidden;
    overflow-y:scroll;

    &::-webkit-scrollbar {
      width:10px;
    }

    &::-webkit-scrollbar-thumb  {
      background:  ${(props) => props.theme.colors["theme-2"]};
    }
  }
`;

interface Props {
    setResults?: any;
    setSelected?: any;
    updateInput?: any;
};

const Search = ({ setResults, setSelected, updateInput }: Props) => {

    const [results, setResultsInternal] = useState([]);
    const [input, updateInputInternal] = useState("");
    const [selected, setSelectedInternal] = useState("");

    const handleResults = setResults ?? setResultsInternal;
    const handleInput = updateInput ?? updateInputInternal;
    const handleSelected = setSelected ?? setSelectedInternal;

    const handleSelectedInternal = (value) => {
        handleSelected(value);
        handleInput("");
    }

    const searchInputRef = React.useRef(null);

    const autoComplete = async (term) => {
        await fetch(`https://api.teleport.org/api/cities/?search=${term}`)
            .then(data => data.json())
            .then((response) => {
                // console.log(response._embedded[`city:search-results`])
                handleResults(response._embedded[`city:search-results`]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateInput = ({ target: { value } }) => {
        handleInput(value)
    }

    useEffect(() => {
        if (document.activeElement !== searchInputRef.current || !input.length) {
            handleResults([]);
            handleInput("");
        }
        else {
            autoComplete(input);
        }
    }, [input])

    return (
        <Container>
            <Wrapper className="relative h-full w-3/4">
                <Form role='search' action="/" method="get">
                    <div className="w-full h-full flex items-center justify-center">
                        <label htmlFor='city-search' className="hidden">
                            <span className='visually-hidden'>
                                Search
                            </span>
                        </label>
                        <SearchInput ref={searchInputRef} type="text" id="city-search" placeholder="Your city..." onChange={handleUpdateInput} value={input} />
                    </div>
                    <Button type='submit'>
                        <span className='visually-hidden'>
                            {/* <!-- License: CC Attribution. Made by seyfdesigner: https://www.figma.com/@seyfdesigner --> */}
                            <svg width="24px" height="24px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" fill="#eee">
                                    <title>search</title>
                                    <g id="search-Filled">
                                        <path id="search-Filled-2" data-name="search-Filled" className="cls-1" d="M21.707,20.293l-4.539-4.539a8.527,8.527,0,1,0-1.414,1.414l4.539,4.539a1,1,0,0,0,1.414-1.414ZM4,10.5A6.5,6.5,0,1,1,10.5,17,6.508,6.508,0,0,1,4,10.5Z" />
                                    </g>
                                </svg>
                        </span>
                    </Button>
                </Form>
                <Results results={results} setSelected={handleSelectedInternal} className={(input && results.length && document.activeElement === searchInputRef.current) ? '' : "hidden"} />
            </Wrapper>
        </Container>
    )
};

export default Search;