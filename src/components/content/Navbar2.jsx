import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { backgroundColor, textColor } from "../../global-styles";

const SearchSection = styled.div`
  visibility: ${(props) => props.visible};
  background-color: ${(props) =>
    props.focused ? "#fff" : `${backgroundColor.primary.light}`};
  margin: 0 10px;
  /* width: 100px; */
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
  @media (max-width: 768px) {
    /* margin-right: 100px; */
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
  padding: 0;
  font-size: 30px;
  font-family: "Poppins", sans-serif;
  /* background-color: pink; */
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
  /* background-color: lime; */
  overflow-y: visible;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    background-color: ${textColor.secondary.dark};
    height: calc(100% - 60px);
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
  /* background-color: gray; */
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

export const Navbar2 = () => {
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
    // dispatch(changeSearchName(searchValue));
    // dispatch(setGoSearch());
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
    // dispatch(changeSearchName(""));
    // dispatch(startLoadingGames(1));
  };

  return (
    <>
      <Container>
        {toggle && <BackScreen onClick={() => setToggle(false)} />}
        {/* {toggle ? ( */}
        <NavLogo enabled={toggle}>aac-devs</NavLogo>
        {/* ) : ( */}
        {/* <NavLogo enabled={toggle}>aac</NavLogo>
        )} */}

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
          <NavLi to="/f">home</NavLi>
          <NavLi to="/a">games</NavLi>
          <NavLi to="/b">new</NavLi>
          {toggle && (
            <>
              <NavLi to="/c">order by</NavLi>
              <NavLi to="/d">data source</NavLi>
              <NavLi to="/e">genre</NavLi>
            </>
          )}
        </NavUl>
      </Container>
    </>
  );
};
