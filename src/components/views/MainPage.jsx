import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setListboxParent,
  showListbox,
  startLoadingListboxGenres,
} from "../../actions/components.actions";
import {
  changeFilterGenre,
  changeFilterSource,
  changeOrderBy,
  changeOrderSense,
  resetGoSearch,
  startLoadingGames,
  startLoadingPlatformsGenres,
  // startLoadingGenres,
  startModifyingGames,
} from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";
import { Card, Listbox } from "../index";

const Container = styled.div`
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
  padding: 0 15px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 55px;
  padding-bottom: 15px;
  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

const PagSection = styled.div`
  position: fixed;
  top: 90px;
  z-index: 10;
  @media (max-width: 768px) {
    padding-bottom: 15px;
    visibility: hidden;
  }
`;

const PagActionsGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PagActionsSection = styled.div`
  position: relative;
  margin-right: 15px;
  display: flex;
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

const MainPage = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  // const { loading } = useSelector((state) => state.ui);
  const { listbox } = useSelector((state) => state.components);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1];
        if (last.isIntersecting) {
          dispatch(startLoadingGames(main.nextPage));
        }
      },
      { threshold: 1 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element, main.orderBy]);

  useEffect(() => {
    console.log("main-page");
    dispatch(startLoadingPlatformsGenres("genres"));
    dispatch(startLoadingGames(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("loading..", main.data.savingGameFlag);
    if (!main.data.savingGameFlag) {
      dispatch(startLoadingGames(1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main.data.savingGameFlag]);

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

  const handleShowListbox = (option) => {
    dispatch(showListbox(option));
    dispatch(setListboxParent("main"));
  };

  return (
    <Container>
      <MainSection>
        <PagSection>
          <PagActionsGroup>
            <PagActionsSection>
              <>
                <PagActionBtn
                  theme="primary"
                  onClick={() => handleShowListbox("sorted")}
                >
                  <span>
                    Order by:&nbsp;&nbsp;
                    <strong>{listbox.sorted.selected}</strong>
                  </span>
                  <i className="fas fa-chevron-down"></i>
                </PagActionBtn>
                {listbox.sorted.visible && listbox.parent === "main" && (
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
            </PagActionsSection>

            <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.source.selected === "All" ? "primary" : "secondary"
                }
                onClick={() => handleShowListbox("source")}
                // onClick={() => dispatch(showListbox("source"))}
              >
                {listbox.source.selected}
                &nbsp;&nbsp;&nbsp;
                <i className="fas fa-chevron-down"></i>
              </PagActionBtn>
              {listbox.source.visible && listbox.parent === "main" && (
                <Listbox listName="source" left={0} right="auto" />
              )}
            </PagActionsSection>

            <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.genres.selected === "Genres" ? "primary" : "secondary"
                }
                onClick={() => handleShowListbox("genres")}
                // onClick={() => dispatch(showListbox("genres"))}
              >
                <span>{listbox.genres.selected}</span>(
                {main.data.games.render.length})
                <i className="fas fa-chevron-down"></i>
              </PagActionBtn>
              {listbox.genres.visible && listbox.parent === "main" && (
                <Listbox listName="genres" left="0" right="auto" />
              )}
            </PagActionsSection>
          </PagActionsGroup>
        </PagSection>

        <ListSection>
          {main.data.games.render.length > 0 &&
            main.data.games.render.map(
              (game, index) => (
                // main.data.games.render.length >= 10 ? (
                <Card
                  setElement={
                    main.data.games.render.length - 1 === index
                      ? setElement
                      : null
                  }
                  key={game.id}
                  // enableDelete={false}
                  enableDelete={
                    game.id.toString().startsWith("own") ? true : false
                  }
                  {...game}
                />
              )
              // ) : (
              // <Card
              //   key={game.id}
              //   enableDelete={
              //     game.id.toString().startsWith("own") ? true : false
              //   }
              //   {...game}
              // />
              // )
            )}
        </ListSection>
      </MainSection>
    </Container>
  );
};

export default MainPage;
