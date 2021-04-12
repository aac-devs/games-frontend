import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  showListbox,
  startLoadingListboxGenres,
} from "../../actions/components.actions";
import {
  changeFilterGenre,
  changeFilterSource,
  changeOrderBy,
  changeOrderSense,
  processPaginationOption,
  resetGoSearch,
  setActiveButton,
  setCurrentScreen,
  startLoadingGames,
  startLoadingGenres,
  startModifyingGames,
} from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";
import { Card } from "../content/Card";
import { Listbox } from "../content/Listbox";

const Container = styled.div`
  /* background-color: ${backgroundColor.primary.dark}; */
  /* background-color: wheat; */
  width: 100%;
  flex-grow: 1;
  position: relative;
  min-height: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width: 768px) {
    padding: 0;
    justify-content: center;
  }
`;

const MainSection = styled.div`
  flex-grow: 1;
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;

const ListSection = styled.div`
  height: 100%;
  display: grid;
  gap: 15px;
  padding: 15px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-rows: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-rows: auto;
  justify-items: center;
`;

const PagBtnsGroup = styled.div`
  background-color: ${backgroundColor.primary.normal};
  width: 100%;
  display: flex;
  text-align: center;
  height: 100%;
  align-items: center;
  padding: 3px 0;
  border-radius: 10px;
  div {
    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      flex-grow: 1;
      visibility: visible;
      @media (max-width: 568px) {
        visibility: hidden;
        width: 0;
        height: 0;
      }
    }
    &:nth-child(3) {
      width: 20%;
    }
  }
`;

const PagSection = styled.div`
  position: sticky;
  padding: 10px 15px 0;
  top: 0;
  z-index: 10;
`;

const PagActionsGroup = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
`;

const PagActionsSection = styled.div`
  position: relative;
  margin-right: 15px;
  display: flex;
`;

const PagBtn = styled.button`
  color: ${textColor.primary.light};
  background-color: transparent;
  border: none;
  margin: 0 6px;
  padding: 0 2px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  transition: all 0.3s;
  :hover {
    color: dodgerblue;
  }
  :disabled {
    color: ${textColor.primary.dark};
    cursor: default;
  }
`;

const PagActionBtn = styled.button`
  background-color: ${(props) =>
    props.theme === "primary" ? backgroundColor.primary.normal : "#fff"};
  color: ${(props) => (props.theme === "primary" ? "#fff" : "#000")};
  font-size: 14px;
  border: none;
  width: auto;
  min-width: 150px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  i {
    transition: all 0.3s;
    color: ${(props) => (props.theme === "primary" ? "#fff" : "#000")};
  }
  &:hover {
    color: ${(props) =>
      props.theme === "primary" ? textColor.primary.normal : "#000"};
    i {
      color: ${(props) =>
        props.theme === "primary" ? textColor.primary.normal : "#000"};
    }
  }
`;

const PagUpDownBtn = styled.button`
  background-color: gray;
  border: none;
  width: 40px;
  border-radius: 8px;
  margin-left: 5px;
  background-color: ${backgroundColor.primary.normal};
  color: ${textColor.primary.light};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${textColor.primary.normal};
  }
`;

export const MainPage = ({ history }) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const { listbox } = useSelector((state) => state.components);

  console.log('MainPage');

  // useEffect(() => {
  //   dispatch(setCurrentScreen("games"));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (main.data.games.original.length === 0) {
      dispatch(startLoadingGenres());
      dispatch(startLoadingGames(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (main.data.search && main.data.searchName !== "") {
      dispatch(startLoadingGames(1));
      dispatch(resetGoSearch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main.data.search]);

  useEffect(() => {
    if (main.data.genres.length > 0) {
      dispatch(startLoadingListboxGenres());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main.data.genres]);

  useEffect(() => {
    dispatch(changeOrderBy(listbox.sorted.selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listbox.sorted.selected]);

  useEffect(() => {
    dispatch(changeFilterSource(listbox.source.selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listbox.source.selected]);

  useEffect(() => {
    dispatch(changeFilterGenre(listbox.genres.selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listbox.genres.selected]);

  useEffect(() => {
    dispatch(startModifyingGames());
    dispatch(setActiveButton(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main.orderBy, main.orderSense, main.filterSource, main.filterGenre]);

  useEffect(() => {
    dispatch(startModifyingGames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main.data.games.original]);

  const handleChangeOrderSense = (e) => {
    main.orderSense === "lower-to-higher"
      ? dispatch(changeOrderSense("higher-to-lower"))
      : dispatch(changeOrderSense("lower-to-higher"));
  };

  const handleClickNextButton = () => {
    main.nextPage
      ? main.buttons.active + 1 === main.nextPage
        ? dispatch(startLoadingGames(main.nextPage))
        : dispatch(setActiveButton(main.buttons.active + 1))
      : dispatch(setActiveButton(main.buttons.active + 1));
    dispatch(processPaginationOption());
  };

  const handleClickBackButton = () => {
    main.buttons.active !== 1
      ? dispatch(setActiveButton(main.buttons.active - 1))
      : dispatch(processPaginationOption());
  };

  const handlePaginationButtons = (e) => {
    dispatch(setActiveButton(parseInt(e.target.value)));
    dispatch(processPaginationOption());
  };

  // const handleSelectGame = (id) => {
  //   history.push(`/games/detail/${id}`);
  // };
  return (
    <Container>
      <MainSection>
        {/* <PagSection> */}
        {/* <PagBtnsGroup>
            <div>
              <PagBtn
                onClick={handleClickBackButton}
                disabled={!main.buttons.back}
              >
                back
              </PagBtn>
            </div>
            <div>
              {main.buttons.total.length > 0 &&
                main.buttons.total.map((item) => (
                  <PagBtn
                    key={`buttons:${item}`}
                    onClick={handlePaginationButtons}
                    value={item}
                    disabled={item === main.buttons.active ? true : false}
                    style={{
                      color: `${
                        item === main.buttons.active
                          ? "dodgerblue"
                          : `${textColor.primary.light}`
                      }`,
                    }}
                  >
                    {item}
                  </PagBtn>
                ))}
            </div>
            <div>
              <PagBtn
                onClick={handleClickNextButton}
                disabled={!main.buttons.next}
              >
                next
              </PagBtn>
            </div>
          </PagBtnsGroup> */}

        {/* <PagActionsGroup> */}
        {/* <PagActionsSection>
              <>
                <PagActionBtn
                  theme="primary"
                  onClick={() => dispatch(showListbox("sorted"))}
                >
                  <span>
                    Order by:&nbsp;&nbsp;
                    <strong>{listbox.sorted.selected}</strong>
                  </span>
                  <i className="fas fa-chevron-down"></i>
                </PagActionBtn>
                {listbox.sorted.visible && (
                  <Listbox listName="sorted" left={0} right="auto" />
                )}
                <PagUpDownBtn onClick={handleChangeOrderSense}>
                  <i
                    className={
                      main.orderBy === "None"
                        ? main.orderSense === "lower-to-higher"
                          ? "fas fa-sort-amount-down-alt fa-2x"
                          : "fas fa-sort-amount-down fa-2x"
                        : main.orderBy === "Name"
                        ? main.orderSense === "lower-to-higher"
                          ? "fas fa-sort-alpha-down fa-2x"
                          : "fas fa-sort-alpha-down-alt fa-2x"
                        : main.orderSense === "lower-to-higher"
                        ? "fas fa-sort-numeric-down fa-2x"
                        : "fas fa-sort-numeric-down-alt fa-2x"
                    }
                  ></i>
                </PagUpDownBtn>
              </>
            </PagActionsSection> */}

        {/* <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.source.selected === "All" ? "primary" : "secondary"
                }
                onClick={() => dispatch(showListbox("source"))}
              >
                {listbox.source.selected}
                &nbsp;&nbsp;&nbsp;
                <i className="fas fa-chevron-down"></i>
              </PagActionBtn>
              {listbox.source.visible && (
                <Listbox listName="source" left={0} right="auto" />
              )}
            </PagActionsSection> */}

        {/* <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.genres.selected === "Genres" ? "primary" : "secondary"
                }
                onClick={() => dispatch(showListbox("genres"))}
              >
                <span>{listbox.genres.selected}</span>(
                {main.data.games.render.length})
                <i className="fas fa-chevron-down"></i>
              </PagActionBtn>
              {listbox.genres.visible && (
                <Listbox listName="genres" left="0" right="auto" />
              )}
            </PagActionsSection> */}
        {/* </PagActionsGroup> */}
        {/* </PagSection> */}

        <ListSection>
          {main.data.games.render.length > 0 &&
            main.data.games.render.map((game, index) =>
              index >= (main.buttons.active - 1) * 10 &&
              index <= main.buttons.active * 10 - 1 ? (
                <Card
                  key={game.id}
                  enableDelete={false}
                  // handleSelectGame={handleSelectGame}
                  {...game}
                />
              ) : null
            )}
        </ListSection>
      </MainSection>
    </Container>
  );
};
