import React, { useEffect, useState } from "react"
import { Input } from "./input";
import { Results } from "./results";
import styled from "styled-components";

const FormIcon = styled.div`
    font-size:2rem;    
`;

const Container = styled.div.attrs(props => ({ className: props.className }))`
  position:relative;
  justify-content:center;
  align-items:center;
  display:flex;
  width: 100%;
  height:10vh;
  background:#00224e;

`
const SearchInput = styled.input.attrs(props => ({ className: props.className }))`
    border-radius: 4px;
    background: #000000;
    width:100%;
    color: white;
    padding: 0 1%;
    box-shadow: 0px 0px 0px 3px white;
    
    height: 50%;
    justify-self: center;
    margin: 0;
`

const Form = styled.form.attrs(props => ({ className: props.className }))`
    // min-width: 60%;
    width:100%;
    // max-width:90%;
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
`

const Button = styled.button.attrs(props => ({ className: props.className }))`
    padding: 1%;
    background: #076f8a;
    height: 45%;
    position: absolute;
    right:2.5px;
    text-align: center;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    display: flex;
`
const Wrapper = styled.div.attrs(props => ({ className: props.className }))`
  position: relative;
  height:100%;

  ul {
    position: absolute;
    right:0;
    left:0;
    top: 85%;
    width:100%;
    // min-width: 60%;
    // max-width:90%;
    max-height: 40vh;
    border-radius: 0 0 14px 14px;
    background: #000e20;
    box-shadow: 0px 4px 8px 1px saddlebrown;
    text-align:left;
    overflow-x:hidden;
    overflow-y:scroll;

    &::-webkit-scrollbar {
      width:10px;
    }

    &::-webkit-scrollbar-thumb  {
      background: #245;
    }
  }
`
const Search = ({ setResults, setSelected, updateInput }: { setResults?: any, setSelected?: any, updateInput?: any }) => {

    const [results, setResultsInternal] = useState([]);
    const [input, updateInputInternal] = useState("");
    const [selected, setSelectedInternal] = useState("");

    const handleResults = setResults ?? setResultsInternal;
    const handleInput = updateInput ?? updateInputInternal;
    const handleSelected = setSelected ?? setSelectedInternal;

    const handleSelectedInternal = (value)=>{
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
        if(document.activeElement !== searchInputRef.current || !input.length) {
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
                            <span className='visually-hidden'>Search</span>
                        </label>
                        <SearchInput ref={searchInputRef} type="text" id="city-search" placeholder="Your city..." onChange={handleUpdateInput} value={input} />
                    </div>
                    <Button type='submit'>
                        <span className='visually-hidden'>Search</span>
                    </Button>
                </Form>
                <Results results={results} setSelected={handleSelectedInternal} className={(input && results.length && document.activeElement === searchInputRef.current) ? '' : "hidden"}/>
            </Wrapper>
        </Container>
    )
}

export default Search;