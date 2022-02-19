import styled from "styled-components";
import { PrayerTime } from "./card";

const timeIcons = {
  Fajr: "https://th.bing.com/th/id/OIP.1n1Rv7qNDGqVrc0SLZk9egHaHa?pid=ImgDet&rs=1",
  Dhuha:
    "https://cdn0.iconfinder.com/data/icons/weather-406/24/weather-afternoon-day-time-pm-128.png",
  Ishraq:
    "https://cdn0.iconfinder.com/data/icons/weather-406/24/weather-afternoon-day-time-pm-128.png",
  Dhuhr:
    "https://cdn3.iconfinder.com/data/icons/space-lineal-color-set/512/Sun-512.png",
  Asr: "https://cdn0.iconfinder.com/data/icons/weather-406/24/morning-day-time-weather-512.png",
  Maghrib: "https://image.flaticon.com/icons/png/512/856/856329.png",
  Isha: "https://media.istockphoto.com/vectors/cloudy-night-icon-white-weather-icon-vector-id1131028105?k=6&m=1131028105&s=612x612&w=0&h=vThX-bgrpfTQfkbsKgS7Fp-u12WkJdoeYm1eN_mtiUc=",
};

const prayers = [
  {
    name: "Fajr",
    time: "07:00",
    imgUrl: timeIcons.Fajr,
  },
  {
    name: "Ishraq",
    time: "9:00",
    imgUrl: timeIcons.Ishraq,
  },
  {
    name: "Dhuhr",
    time: "13:00",
    imgUrl: timeIcons.Dhuhr,
  },
  {
    name: "Asr",
    time: "15:30",
    imgUrl: timeIcons.Asr,
  },
  {
    name: "Maghrib",
    time: "17:00",
    imgUrl: timeIcons.Maghrib,
  },
  {
    name: "Isha",
    time: "6:45",
    imgUrl: timeIcons.Isha,
  },
];

export const PrayerTimes = () => {

  return (
    <>
      {prayers.map((prayer, index) => (
        <PrayerTime key={index} prayer={prayer} />
      ))}
    </>
  );
};
