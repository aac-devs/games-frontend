import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { listItems } from "../../helpers/utils";

const BackgroundDateSelected = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background-color: black;
  filter: brightness(50%);
  opacity: 0.4;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  position: absolute;
  top: -5px;
  left: -70px;
  background-color: #fff;
  z-index: 10;
  border-radius: 6px;
  padding: 20px 24px;
  width: 400px;

  @media (max-width: 979px) {
    position: fixed;
    left: 10px;
    bottom: 10px;
    top: unset;
    right: unset;
    width: calc(100vw - 20px);
  }
`;
const Header = styled.div`
  display: flex;
`;
const Title = styled.div`
  flex: 1 1 auto;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;
const SaveButton = styled.div`
  flex: 0 0 auto;
  margin-left: 10px;
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
`;
const Body = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 979px) {
    margin-top: 6px;
    flex-direction: column;
  }
`;
const CustomSelect = styled.select`
  padding: 8px 12px;
  color: #262626;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: #fff;
  overflow: visible;
  width: ${(props) => props.customWidth};

  @media (max-width: 979px) {
    margin-top: 6px;
    font-size: 14px;
    width: 100%;
  }
  option {
    padding: 0 2px 1px;
    @media (max-width: 979px) {
      font-size: 14px;
    }
  }
`;

const DateBox = ({
  show,
  handleSelectedDateClose,
  currentDate,
  handleSelectedDate,
}) => {
  const [date, setDate] = useState(currentDate);
  const arrayDays = listItems("day", 31, 1);
  const arrayMonths = listItems("month", 12, 0);
  const arrayYears = listItems(
    "year",
    dayjs().format("YYYY") - 1970 + 11,
    1970
  );
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate(dayjs(date).set(name, value).toISOString());
  };
  return (
    <>
      <BackgroundDateSelected show={show} onClick={handleSelectedDateClose} />
      <Container show={show}>
        <Header>
          <Title>Release date</Title>
          <SaveButton onClick={(e) => handleSelectedDate(date)}>
            Save
          </SaveButton>
        </Header>
        <Body>
          <CustomSelect
            customWidth="80px"
            name="date"
            defaultValue={dayjs(date).date()}
            onChange={handleDateChange}
          >
            {arrayDays.filter((i) => i.key <= dayjs(date).daysInMonth())}
          </CustomSelect>
          <CustomSelect
            customWidth="160px"
            name="month"
            defaultValue={dayjs(date).month()}
            onChange={handleDateChange}
          >
            {arrayMonths.map((i) => i)}
          </CustomSelect>
          <CustomSelect
            customWidth="88px"
            name="year"
            defaultValue={dayjs(date).year()}
            onChange={handleDateChange}
          >
            {arrayYears.map((i) => i)}
          </CustomSelect>
        </Body>
      </Container>
    </>
  );
};

export default DateBox;
