import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Search from "./../components/search";
import {PrayerTimes} from "./../components/searchResults/index"

export default function Home() {
  return (
    <>
      <Head>
        <title>Prayer Times - v2</title>
      </Head>
      <section>
        <div className="header-img">
          <img src="../mosque-transparent-bg.png" className="logo-img" />
        </div>
        <h1>Welcome to Prayer Times</h1>
      </section>
      <section>
        <Search className={"searchBar"} />
      </section>
      <section>
        <PrayerTimes/>
      </section>
    </>
  );
}
