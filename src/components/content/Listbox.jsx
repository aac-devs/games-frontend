import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  hideListbox,
  setSelectedOption,
} from "../../actions/components.actions";
import { BackScreen } from "../../global-styles";

const Container = styled.div`
  /* position: ${(props) => props.position}; */
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: max-content;
  background-color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1000;
  overflow-y: auto;
  @media (max-width: 768px) {
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: auto;
    left: auto;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
  }
  li {
    border-radius: 4px;
    list-style: none;
    height: 20px;
    margin: 5px 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #ddd;
    }
    i {
      color: springgreen;
    }
  }
`;

// TODO: cargar videogames.search.filtering con el valor cambiado.
const Listbox = ({
  listName,
  width = "220px",
  left,
  right,
  top = "0px",
  exclude = [],
}) => {
  const dispatch = useDispatch();
  const { listbox } = useSelector((state) => state.components);
  const [back, setBack] = useState(true);

  const handleOptionChange = (e) => {
    const value = e.target.id;
    dispatch(setSelectedOption({ destination: listName, option: value }));
    dispatch(hideListbox(listName));
  };

  const handleBackScreenClick = (e) => {
    e.stopPropagation();
    dispatch(hideListbox(listName));
    setBack(false);
  };
  return (
    <>
      {back && <BackScreen onClick={handleBackScreenClick} />}
      <Container width={width} left={left} right={right} top={top}>
        <ul>
          {listbox[listName].list.map((item) =>
            !exclude.includes(item) ? (
              <li key={item} onClick={handleOptionChange} id={item}>
                {item}&nbsp;
                {listbox[listName].selected === item && (
                  <i className="fas fa-check"></i>
                )}
              </li>
            ) : null
          )}
        </ul>
      </Container>
    </>
  );
};

export default Listbox;
