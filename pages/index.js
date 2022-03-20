import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Search from "./../components/search";
import { PrayerTimes } from "./../components/searchResults/index"
import styled from 'styled-components';
import { Results } from "../components/search/results";
import { useEffect, useState } from "react";

const LogoWrapper = styled.div.attrs(props => ({ className: props.className }))`
  top: 0;
  display: block;
  background: sienna;
  height:fit-content;

  img {
    margin: 0 auto;
  }
`
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
const Section = styled.section.attrs(props => ({ className: props.className }))`
  text-align: center;
  padding: 0 10%;
  color: aqua;
  font-size: 25px;
`
export default function Home() {
  const [results, setResults] = useState([]);
  const [input, updateInput] = useState("");
  const [selected, setSelected] = useState("");

  const autoComplete = async (term) => {
    await fetch(`https://api.teleport.org/api/cities/?search=${term}`)
      .then(data => data.json())
      .then((response) => {
        // console.log(response._embedded[`city:search-results`])
        setResults(response._embedded[`city:search-results`]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateInput = ({ target: { value } }) => {
    updateInput(value)
  }

  useEffect(() => {
    if (input.length) autoComplete(input);

    if (!input.length) setResults([])
  }, [input])

  return (
    <>
      <Head>
        <title>Prayer Times - v2</title>
      </Head>
      <div className="relative flex flex-wrap bg-[#00224e] text-white w-full text-center p-0 m-0">
        <LogoWrapper className="header-img p-0 w-full">
          <img src="../mosque-transparent-bg.png" className="logo-img" />
        </LogoWrapper>
        <Container>
          <Wrapper className="relative h-full w-3/4">
            <Form role='search' action="/" method="get">
              <div className="w-full h-full flex items-center justify-center">
                <label htmlFor='city-search' className="hidden">
                  <span className='visually-hidden'>Search</span>
                </label>
                <SearchInput type="text" id="city-search" placeholder="Your city..." onChange={handleUpdateInput} />
              </div>
              <Button type='submit'>
                <span className='visually-hidden'>Search</span>
              </Button>
            </Form>
            <Results results={results} setSelected={setSelected} />
          </Wrapper>
        </Container>
      </div>

      <div className="w-full flex justify-around">
        <div className="w-4/5">
          <p className="w-full flex items-center 
                        align-center justify-center 
                        border-b-2 border-dashed border-white
                        text-blue-300
                        text-center h-40 text-[7vh]">00:00:00</p>
        </div>
      </div>
      {/* 
      <section>
        <h1 className="text-white">Welcome to Prayer Times - v2</h1>
      </section> */}
      <Section>
        <h3>{selected}</h3>
      </Section>
      {/* <section>
        <PrayerTimes/>
      </section> */}
    </>
  );
}
