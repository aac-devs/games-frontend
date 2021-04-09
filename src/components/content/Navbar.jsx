import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoMarca = styled.div`
  width: 60px;
  height: 60px;
  background-color: #fff;
  background-image: url("/logo-marca.png");
  background-size: contain;
  border-radius: 50%;
  filter: brightness(80%);
  box-shadow: 0px 0px 7px rgba(250, 250, 250, 0.5);
  transition: all 0.3s;
  background-position: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
  }
  position: absolute;
  top: 5px;
  left: 5px;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  height: 80px;
  padding: 0 20px;

  .custom-link {
    text-decoration: none;
  }

  .logo {
    font-size: 30px;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
    background-color: red;
    font-family: "Poppins", sans-serif;
  }

  ul {
    display: flex;
    /* margin-right: 40px; */
    list-style: none;
    background-color: palevioletred;
  }

  li {
    font-size: 18px;
    margin: 0 10px;
    /* line-height: 80px; */
    text-transform: uppercase;
    width: max-content;
  }

  .nav-link {
    padding: 8px 12px;
    border-radius: 3px;
    color: #fff;
  }
  .nav-link:hover,
  .nav-menu-link_active {
    background-color: #034574;
    transition: 0.5s;
  }

  .toggle-button {
    color: white;
    background: none;
    border: none;
    font-size: 30px;
    padding: 0 20px;
    /* line-height: 60px; */
    display: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 60px;

    .logo {
      /* font-size: 25px; */
      /* padding: 0 20px; */
      /* line-height: 60px; */
    }
    ul {
      border-radius: 20px;
      flex-direction: column;
      align-items: center;
      margin: 0;
      background-color: #fff;
      position: fixed;
      left: 0;
      top: 60px;
      width: 50%;
      padding: 20px;
      height: calc(70% - 60px);
      overflow-y: auto;
      left: 100%;
      transition: left 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }
    li {
      background-color: lime;
      /* line-height: 70px; */
      /* width: 100%; */
    }
    .nav-link {
      /* line-height: 20px; */
      /* display: block; */
      background-color: gray;
      /* width: 100%; */
      color: #000;
    }
    .nav-link:hover,
    .nav-menu-link_active {
      background: none;
      color: red;
    }
    .toggle-button {
      display: block;
    }
    .toggle-button:focus:not(:focus-visible) {
      outline: none;
    }
    .nav-menu-visible {
      left: 50%;
    }
  }
`;

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <NavContainer>
      <Link to="/" className="logo">
        aac-devs
      </Link>
      <button
        aria-label="abrir menu"
        className="toggle-button"
        onClick={() => setToggle(!toggle)}
      >
        {!toggle ? (
          <i className="fas fa-bars"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </button>
      <ul className={`${toggle ? "nav-menu-visible" : ""}`}>
        <li>
          <Link to="/" className="custom-link nav-link">
            home
          </Link>
        </li>
        <li>
          <Link to="/" className="custom-link nav-link">
            games
          </Link>
        </li>
        <li>
          <Link to="/" className="custom-link nav-link">
            add new
          </Link>
        </li>
        <li>
          <Link to="/" className="custom-link nav-link">
            order by
          </Link>
        </li>
        <li>
          <Link to="/" className="custom-link nav-link">
            data source
          </Link>
        </li>
        <li>
          <Link to="/" className="custom-link nav-link">
            genre
          </Link>
        </li>
      </ul>
    </NavContainer>
  );
};
