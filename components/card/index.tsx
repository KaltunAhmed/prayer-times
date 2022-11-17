import { theme } from "../../styles/theme";
import styled from "styled-components";

const PrayerTimesCard = styled.div.attrs(props => ({ className: props.className, bgColor: props.bgColor }))`
  position: relative;
  background-color: ;
  background: linear-gradient(90deg, rgba(0,255,252,1) 0%, rgba(9,9,121,1) 0%, ${props => props.bgColor} 200%);
  display:flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border-radius: 10px;

  :hover {
    background: linear-gradient(90deg, rgba(0,255,252,1) 0%, rgba(9,9,121,1) 0%, ${theme.colors['Y100']} 200%);
    transition: color 0.1s ease, background-color 1s ease-in;

  }
`;

interface Props {
  prayer: string;
  time: string;
}

const arabicPT = {
  "Fajr": "فجر",
  "Dhuhr": "ظهر",
  "Asr": "عصر",
  "Maghrib": "مغرب",
  "Isha": "عشاء"
}
export const Card = ({ prayer, time, ...props }: Props) => {

  return (
    <PrayerTimesCard {...props}>
      <svg width="240" height="320" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,25 V 110 H 90 V 25 H 85 V 15 L50,-10 L15,15 V 25 Z"
          fill="black"
          strokeWidth="6"
          stroke={theme.colors['T400']}
        />
        <path d="M 10 25 V 110 H 90 V 25 H 85 V 15 L50,-10 L15,15 V 25 Z"
          fill="transparent" stroke="black" />
        <text textAnchor="middle"  fontSize={"15.5"} fontStyle={""}>
          <tspan x="50" y="25" fill={theme.colors['Y100']} style={{ "direction": "rtl" }}>{arabicPT[prayer]}</tspan>
          <tspan x="50" dy="35" fill="white">{time}</tspan>
          <tspan x="50" dy="30" fill="white">{prayer}</tspan>
        </text>
      </svg>
    </PrayerTimesCard>
  )
};

export default Card;
