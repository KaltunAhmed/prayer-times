import Head from "next/head";
import Image from "next/image";
import styled from 'styled-components';
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

import Search from "./../components/search";
import { PrayerTimes } from "../components/old/index"
import { Results } from "../components/search/results";
import {Card} from "../components/card";

const LogoWrapper = styled.div.attrs(props => ({ className: props.className }))`
  top: 0;
  display: block;
  background: sienna;
  height:fit-content;

  img {
    margin: 0 auto;
  }
`
const Section = styled.section.attrs(props => ({ className: props.className }))`
  text-align: center;
  padding: 0 10%;
  color: aqua;
  font-size: 25px;
  margin: 2% 0;
`;

export default function Home() {

  const [results, setResults] = useState([]);
  const [input, updateInput] = useState("");
  const [selected, setSelected] = useState("");
  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    if (!selected.length) return;

    const [city, state, country] = selected.split(', ');
    (async () => {
      await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&state=${state}&country=${country}`)
        .then(res => res.json())
        .then(data => {
          setPrayerTimes(data.data.timings);
          // console.log(data.data.timings, prayerTimes);
          return data;
        })
        .catch(err =>
          console.log(err)
        );

    })();
  }, [selected])

  return (
    <>
      <Head>
        <title>Prayer Times - v2</title>
      </Head>
      <div className="relative flex flex-wrap bg-[#00224e] text-white w-full text-center p-0 m-0">
        <LogoWrapper className="header-img p-0 w-full">
          <img src="../mosque-transparent-bg.png" className="logo-img" />
        </LogoWrapper>
        <Search setSelected={setSelected} />
      </div>

      {/* 
      <section>
        <h1 className="text-white">Welcome to Prayer Times - v2</h1>
      </section> */}

      <Section>
        <h3>{selected}</h3>
      </Section>
      <Section>
        {Object.keys(prayerTimes).length ? (
          <div className="flex justify-center flex-wrap w-full">
            <Card prayer={"Fajr"} time={prayerTimes.Fajr}/>
            <Card prayer={"Dhuhr"} time={prayerTimes.Dhuhr}/>
            <Card prayer={"Asr"} time={prayerTimes.Asr}/>
            <Card prayer={"Maghrib"} time={prayerTimes.Maghrib}/>
            <Card prayer={"Isha"} time={prayerTimes.Isha}/>
          </div>
        )
          : <p>No location selected</p>}
      </Section>
    </>
  );
}
