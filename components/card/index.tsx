import styled from "styled-components";

const archBg = "PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9ImdyZWVuIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xMCwyNSBWIDExMCBIIDkwIFYgMjUgSCA4NSBWIDE1IEw1MCwtMTAgTDE1LDE1IFYgMjUgWiIKICAgIGZpbGw9InRyYW5zcGFyZW50IgogICAgc3Ryb2tlLXdpZHRoPSI2IgogICAgc3Ryb2tlPSJncmVlbiIKICAgIC8+CiAgIDxwYXRoIGQ9Ik0gMTAgMjUgViAxMTAgSCA5MCBWIDI1IEggODUgViAxNSBMNTAsLTEwIEwxNSwxNSBWIDI1IFoiIAogICAgIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9ImJsYWNrIi8+Cjwvc3ZnPgo="
const PrayerTimesCard = styled.div.attrs(props => ({ className: props.className }))`
  width:150px;
  padding:10px;
  // background: #592513d9;
  margin: 2%;
  height: 200px;
  position: relative;
  background-color: none;
  background-image:url(data:image/svg+xml;base64,${props => archBg}), url(data:image/svg+xml;base64,${props => archBg}), url(data:image/svg+xml;base64,${props => archBg});
  background-size: contain;
  // backdrop-filter: brightness(0.5);
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
`

export const Card = ({prayer, time}:{prayer:string, time:string}) => {

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