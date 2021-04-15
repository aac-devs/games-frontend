import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  setSelectedOption,
  showListbox,
} from "../../actions/components.actions";
import {
  changeSearchName,
  setCurrentScreen,
  setGoSearch,
  startLoadingGames,
  startSavingGame,
} from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";
import { Listbox } from "../index";

const SearchSection = styled.div`
  visibility: ${(props) => props.visible};
  background-color: ${(props) =>
    props.focused ? "#fff" : `${backgroundColor.primary.light}`};
  margin: 0 10px;
  max-width: 500px;

  flex-grow: 1;
  height: 35px;
  border-radius: 20px;
  transition: all 0.5s;
  form {
    height: 100%;
    padding: 0 8px 0 15px;
    display: flex;
    align-items: center;
    input {
      width: 60%;
      color: ${(props) => (props.focused ? "#000" : "#ccc")};
      background-color: transparent;
      height: 80%;
      flex-grow: 1;
      border: none;
      outline: none;
      font-size: 16px;
      transition: all 0.5s;
      &:hover {
        color: #000;
      }
    }
    i {
      color: gray;
      padding: 3px;
      cursor: pointer;
    }
  }
  &:hover {
    background-color: #fff;
  }
  &:focus {
    background-color: #fff;
  }
`;

const Container = styled.nav`
  height: 80px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  box-shadow: 0px 0px 7px rgba(128, 128, 128, 0.9);
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${textColor.secondary.normal};
`;

const NavLogo = styled.div`
  color: ${(props) => (props.enabled ? "#484848" : textColor.secondary.normal)};
  text-shadow: 3px 3px 3px #000;

  padding: 0;
  font-size: 30px;
  font-family: "Poppins", sans-serif;
  width: 150px;
  min-width: 150px;
  text-align: center;
  @media (max-width: 768px) {
    min-width: 130px;
    width: 130px;
    font-size: 25px;
  }
`;

const NavUl = styled.ul`
  display: flex;
  position: relative;
  align-items: center;
  overflow-y: visible;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    background-color: #fff;
    height: max-content;
    width: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 10px 10px 0 10px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    transition: right 0.3s;
  }
`;

const NavLi = styled(CustomLink)`
  list-style: none;
  margin-left: 20px;
  text-transform: uppercase;
  width: max-content;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  padding: 3px 8px 0 8px;
  color: ${textColor.primary.dark};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${backgroundColor.primary.light};
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
    height: 40px;
    font-size: 24px;
    border-radius: 15px;
    padding-top: 8px;
    transition: background-color 0.3s;
    color: ${backgroundColor.primary.dark};
    &:hover {
      background-color: #ccc;
    }
  }
`;

const MenuItem = styled.div`
  list-style: none;
  margin-left: 20px;
  text-transform: uppercase;
  width: max-content;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  padding: 3px 8px 0 8px;
  color: ${textColor.primary.dark};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${backgroundColor.primary.light};
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
    height: 40px;
    font-size: 24px;
    border-radius: 15px;
    padding-top: 8px;
    transition: background-color 0.3s;
    color: ${backgroundColor.primary.dark};
    &:hover {
      background-color: #ccc;
    }
  }
`;

const ToggleButton = styled.button`
  color: ${backgroundColor.primary.light};
  background: none;
  border: 1px solid ${backgroundColor.primary.light};
  font-size: 30px;
  padding: 3px 5px 1px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: none;
  outline: none;
  width: 38px;
  min-width: 38px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BackScreen = styled.div`
  background-color: #000;
  opacity: 0.9;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    currentScreen,
    data: { detailedGame },
  } = useSelector((state) => state.main);
  const { listbox } = useSelector((state) => state.components);

  const [toggle, setToggle] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchInput = useRef();

  useEffect(() => {
    const handleFocus = () => {
      setFocused(false);
    };
    window.addEventListener("focusout", handleFocus);
    return () => {
      window.removeEventListener("focusout", handleFocus);
    };
  }, []);

  const handleSearchGame = (e) => {
    e.preventDefault();
    dispatch(changeSearchName(searchValue));
    dispatch(setGoSearch());
  };
  const handleSearchClick = (e) => {
    setFocused(true);
    setToggle(false);
  };

  const handleChangeSearchName = (e) => {
    setSearchValue(e.target.value);
  };

  const handleResetSearching = (e) => {
    setSearchValue("");
    dispatch(changeSearchName(""));
    dispatch(startLoadingGames(1));
  };

  const handleSaveGame = (e) => {
    //TODO: Validar campos:
    dispatch(startSavingGame());
    dispatch(setSelectedOption({ destination: "genres", option: "Genres" }));
    dispatch(
      setSelectedOption({ destination: "platforms", option: "Platforms" })
    );
  };

  const handleHideToggle = () => {
    setToggle(false);
  };

  const setNextScreen = (value) => {
    (value === "home" || value === "games" || value === "create") &&
      dispatch(setCurrentScreen(value));
    (value === "cancel" || value === "save") &&
      dispatch(setCurrentScreen("games"));
    value === "save" && handleSaveGame();
    value === "update" && dispatch(setCurrentScreen("update"));
    setToggle(false);
  };

  const handleOrderFilter = (value) => {
    dispatch(showListbox(value));
    setToggle(false);
  };

  return (
    <>
      <Container>
        {toggle && <BackScreen onClick={handleHideToggle} />}
        <NavLogo enabled={toggle}>aac-devs</NavLogo>

        {currentScreen === "games" && (
          <SearchSection focused={focused}>
            <form onSubmit={handleSearchGame}>
              <input
                type="text"
                autoComplete="off"
                onClick={handleSearchClick}
                ref={searchInput}
                value={searchValue}
                onChange={handleChangeSearchName}
              />
              {searchValue !== "" ? (
                <i className="fas fa-times" onClick={handleResetSearching}></i>
              ) : (
                <i className="fas fa-search" onClick={handleSearchGame}></i>
              )}
            </form>
          </SearchSection>
        )}
        <ToggleButton onClick={() => setToggle(!toggle)}>
          {!toggle ? (
            <i className="fas fa-bars"></i>
          ) : (
            <i className="fas fa-times"></i>
          )}
        </ToggleButton>
        <NavUl
          className={`${toggle ? "nav-menu-visible" : "nav-menu-invisible"}`}
        >
          {currentScreen !== "home" && (
            <NavLi onClick={(e) => setNextScreen("home")} to="/">
              home
            </NavLi>
          )}
          {currentScreen !== "games" && (
            <NavLi onClick={(e) => setNextScreen("games")} to="/games">
              games
            </NavLi>
          )}

          {currentScreen !== "create" && currentScreen !== "update" && (
            <NavLi onClick={(e) => setNextScreen("create")} to="/games/create">
              new
            </NavLi>
          )}
          {currentScreen === "detail-own" && (
            <NavLi
              onClick={(e) => setNextScreen("update")}
              to={`/games/update/${detailedGame?.id}`}
            >
              edit
            </NavLi>
          )}

          {currentScreen === "games" && toggle && (
            <>
              {toggle && <hr />}
              <MenuItem onClick={(e) => handleOrderFilter("sorted")}>
                order by
              </MenuItem>
              <MenuItem onClick={(e) => handleOrderFilter("source")}>
                data source
              </MenuItem>
              <MenuItem onClick={(e) => handleOrderFilter("genres")}>
                genre
              </MenuItem>
            </>
          )}
          {(currentScreen === "create" || currentScreen === "update") && (
            <>
              {toggle && <hr />}

              <NavLi onClick={(e) => setNextScreen("save")} to="/games">
                save
              </NavLi>
              <NavLi onClick={(e) => setNextScreen("cancel")} to="/games">
                cancel
              </NavLi>
            </>
          )}

          {listbox.sorted.visible && (
            <Listbox listName="sorted" left={0} right="auto" />
          )}
          {listbox.source.visible && (
            <Listbox listName="source" left={0} right="auto" />
          )}
          {listbox.genres.visible && (
            <Listbox listName="genres" left={0} right="auto" />
          )}
        </NavUl>
      </Container>
    </>
  );
};

export default Navbar;
