import styled from "styled-components";

//base64 of svg shape
const archBg = `PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDEwMCAxM
DAiIGZpbGw9ImdyZWVuIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0
xMCwyNSBWIDExMCBIIDkwIFYgMjUgSCA4NSBWIDE1IEw1MCwtMTAgTDE1LDE1IFYgMjUgWiIKICAgIGZpbGw
9InRyYW5zcGFyZW50IgogICAgc3Ryb2tlLXdpZHRoPSI2IgogICAgc3Ryb2tlPSJncmVlbiIKICAgIC8+CiAgIDx
wYXRoIGQ9Ik0gMTAgMjUgViAxMTAgSCA5MCBWIDI1IEggODUgViAxNSBMNTAsLTEwIEwxNSwxNSBWIDI1IFoiIAogI
CAgIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9ImJsYWNrIi8+Cjwvc3ZnPgo=`;

const PrayerTimesCard = styled.div.attrs(props => ({ className: props.className }))`
  width:150px;
  padding:10px;
  margin: 2%;
  height: 200px;
  position: relative;
  background-color: none;
  background-image:url(data:image/svg+xml;base64,${props => archBg}), url(data:image/svg+xml;base64,${props => archBg}), url(data:image/svg+xml;base64,${props => archBg});
  background-size: contain;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;

  display:flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  div {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    height: 50%;
    top: 32%;

  }
`;

interface Props {
  prayer: string;
  time: string;
}

export const Card = ({ prayer, time }: Props) => {

  return (
    <PrayerTimesCard> 
      <div>
        <span>{prayer}: </span>
        <span>{time}</span>
      </div>
    </PrayerTimesCard>
  )
};

export default Card;