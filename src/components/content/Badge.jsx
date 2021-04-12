import styled from "styled-components";
import { backgroundColor, textColor } from "../../global-styles";

const BadgeContainer = styled.div`
  position: relative;
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  max-width: 400px;
  box-sizing: border-box;
  margin-right: 12px;
  margin: 0 7px 7px 0;
  padding: 5px ${(props) => (props.hasMarginRight ? "30px" : "10px")} 5px 10px;
  border-radius: 20px;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  font-family: "Roboto", sans-serif, Helvetica, Arial;
  background-color: ${(props) => props.background};
  transition: border-color 0.3s;
`;

const BadgeText = styled.div`
  font-size: 16x;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s;
  overflow: hidden;
  color: ${textColor.primary.light};
`;

const BadgeButton = styled.button`
  background-color: ${backgroundColor.secondary.dark};
  color: ${textColor.primary.light};
  border: none;
  padding: 2px 5px;
  border-radius: 50%;
  position: absolute;
  top: 3.5px;
  right: 4px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${backgroundColor.secondary.normal};
  }
`;

export const Badge = ({ id, text, name, hasCloseButton, handleClose }) => {
  const backColor =
    name === "genres"
      ? backgroundColor.primary.dark
      : backgroundColor.primary.normal;
  return (
    <BadgeContainer background={backColor} hasMarginRight={hasCloseButton}>
      <BadgeText>{text}</BadgeText>
      {hasCloseButton && (
        <BadgeButton onClick={(e) => handleClose(id, name)}>
          <i className="fas fa-times"></i>
        </BadgeButton>
      )}
    </BadgeContainer>
  );
};
