import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  hideListbox,
  setSelectedOption,
} from "../../actions/components.actions";

const BackgroudMenu = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background-color: rgba(0, 0, 0, 0.8);
  /* filter: brightness(50%); */
  /* opacity: 0.8; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  /* width: ${(props) => props.width}; */
  width: max-content;
  background-color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 100;
  overflow-y: auto;
  @media (max-width: 768px) {
    /* height: 95%; */
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

  const handleBackground = (e) => {
    e.stopPropagation();
    dispatch(hideListbox(listName));
  };
  const handleOptionChange = (e) => {
    const value = e.target.id;
    dispatch(setSelectedOption({ destination: listName, option: value }));
    dispatch(hideListbox(listName));
  };
  return (
    <>
      <BackgroudMenu
        show={listbox[listName].visible}
        onClick={handleBackground}
      >
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
      </BackgroudMenu>
    </>
  );
};

export default Listbox;
