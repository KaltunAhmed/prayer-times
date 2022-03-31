import styled from "styled-components";

const Prayer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background: rgba(11, 4, 114, 0.815);
  width: 50vh;
  border-radius: 12px;
  overflow: hidden;
  margin: 2%;
  position: relative;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 12px 0 0 12px;
  background: darkcyan;
`;

const Time = styled.p`
  width: 100%;
  font-size: 60px;
  text-align: center;
  width: 100%;
  align-self: center;
  padding: 0%;
  margin: 0;
`;

const Name = styled.p`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  color: orange;
  padding: 2%;
  text-align: right;
`;

export const PrayerTime = ({prayer:{ name, time, imgUrl },...props}) => {
  return (
    <Prayer>
      <Img alt="prayer icon" src={imgUrl} />
      <Time >{ time }</Time>
      <Name >{name }</Name>
    </Prayer>
  );
};
