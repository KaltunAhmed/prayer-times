import Head from "next/head";
import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from "react";

import Search from "./../components/search";
import { Card } from "../components/card";
import { theme } from "./../styles/theme";
import GlobalStyle from './../styles/global';
import { Results } from "../components/search/results";

const LogoWrapper = styled.div.attrs(props => ({ className: props.className }))`
  display: flex;
  position: relative;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width:100%;

  img {
    width: 10em;
  }
`;
const Main = styled.main.attrs(props => ({ className: props.className }))`
  display: flex;
  flex-direction: column;
  width:80%;
  height:100%;
  align-items: center;
  border-radius: 0 0 7px 7px;
  filter: drop-shadow(2px 4px 6px black);

  @media screen and (max-width:500px){
    width: 92%;
  }
`;
const Section = styled.section.attrs(props => ({ className: props.className }))`
  text-align: center;
  padding: 0;
  color: ${(props) => props.theme.colors['B50']};
  font-size: 25px;
  margin: 10px 0;
  position: relative;

  border-radius: 7px;
  filter: drop-shadow(2px 4px 6px black);;
  width:100%;
`;

export default function Home() {

  const [selected, setSelected] = useState("");
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState({});

  useEffect(() => {
    if (!selected.length) return;

    const [city, state, country] = selected.split(', ');
    (async () => {
      await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&state=${state}&country=${country}`)
        .then(res => res.json())
        .then(data => {
          // setPrayerTimes(data.data.timings);
          // console.log(data.data.timings, prayerTimes);
          const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;

          const mainPrayers = { Fajr, Dhuhr, Asr, Maghrib, Isha };
          setPrayerTimes(mainPrayers);

          const nextPrayer = calculateNextPrayer([{ Fajr }, { Dhuhr }, { Asr }, { Maghrib }, { Isha }]);

          setNextPrayer(nextPrayer.length ? Object.keys(nextPrayer[0])[0] : "Fajr");
          // console.log(nextPrayer)

          return data;
        })
        .catch(err =>
          console.log(err)
        );

    })();
  }, [selected]);

  const calculateNextPrayer = (times) => {
    //we should consider user checking prayer times for a foreign city
    const timeNow = (new Date()).toLocaleTimeString().slice(0, 5);
    const sorted = times.filter((a) => {
      return Object.values(a)[0] >= timeNow
    });
    return sorted;
  }

  const country = selected.split(', ')[2];

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Prayer Times - v2</title>
        </Head>
        <header className="relative flex flex-wrap bg-theme-1 inline-block text-white w-full text-center p-0 m-0">
          <LogoWrapper className="header-img p-0">
            <img alt="mosque logo" src="../mosque-transparent-bg.png" />
          </LogoWrapper>
          <Search setSelected={setSelected} />
        </header>

        <Main>

          {selected &&
            (<Section>
              <h2>
                <span>
                  <img alt={country+"'s flag"} width="50px" height="50px" style={{ display: "inline-flex", margin: "0 10px" }}
                    src={`https://countryflagsapi.com/svg/${country}`} /></span>

                {selected}

                <span><img alt={country+"'s flag"} width="50px" height="50px" style={{ display: "inline-flex", margin: "0 10px" }}
                  src={`https://countryflagsapi.com/svg/${country}`}/></span>
              </h2>
            </Section>
            )
          }

          <Section>
            {Object.keys(prayerTimes).length ? (
              <div className="flex w-full justify-center flex-wrap w-full">
                {
                  Object.keys(prayerTimes).map((prayer, index) => {
                    return (
                      <Card key={index} prayer={prayer} time={prayerTimes[prayer]} bgColor={prayer === nextPrayer ? theme.colors['B100'] : ''} />
                    )
                  })
                }
              </div>
            )
              : <p>No location selected</p>}
          </Section>

        </Main>


      </ThemeProvider>
    </>

  );
}
