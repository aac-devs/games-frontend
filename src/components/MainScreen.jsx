import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  resetListboxValues,
  setListboxParent,
  showListbox,
  startLoadingListboxGenres,
} from '../actions/components.actions';
import {
  changeFilterGenre,
  changeFilterSource,
  changeOrderBy,
  changeOrderSense,
  cleanArrays,
  dataRequest,
  resetGoSearch,
  setCurrentScreen,
  startModifyingGames,
} from '../actions/games.actions';
import { backgroundColor, textColor } from '../global-styles';
import Card from './Card';
import Listbox from './Listbox';

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
    props.theme === 'primary' ? backgroundColor.primary.normal : '#fff'};
  color: ${(props) => (props.theme === 'primary' ? '#fff' : '#000')};
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
    color: ${(props) => (props.theme === 'primary' ? '#fff' : '#000')};
  }
  &:hover {
    color: ${(props) =>
      props.theme === 'primary' ? textColor.primary.normal : '#000'};
    i {
      color: ${(props) =>
        props.theme === 'primary' ? textColor.primary.normal : '#000'};
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

const MainScreen = () => {
  const dispatch = useDispatch();
  const { listbox } = useSelector((state) => state.components);
  const {
    savingGameFlag,
    games,
    render,
    genres,
    orderBy,
    orderSense,
    filterSource,
    filterGenre,
    searchName,
    search,
  } = useSelector((state) => state.games);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1];
        if (last.isIntersecting) {
          dispatch(dataRequest());
        }
      },
      { threshold: 1 },
    ),
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
  }, [element, orderBy]);

  useEffect(() => {
    dispatch(setCurrentScreen('games'));
    if (!savingGameFlag) {
      dispatch(resetListboxValues());
      dispatch(cleanArrays());
      dispatch(dataRequest());
    }
  }, [savingGameFlag]);

  useEffect(() => {
    if (games.length > 0) {
      dispatch(startModifyingGames());
    }
  }, [games]);

  useEffect(() => {
    if (search && searchName !== '') {
      dispatch(cleanArrays());
      dispatch(dataRequest());
      dispatch(resetGoSearch());
    }
  }, [search]);

  useEffect(() => {
    if (genres.length > 0) {
      dispatch(startLoadingListboxGenres());
    }
  }, [genres]);

  useEffect(() => {
    dispatch(changeOrderBy(listbox.sorted.selected));
  }, [listbox.sorted.selected]);

  useEffect(() => {
    dispatch(changeFilterSource(listbox.source.selected));
  }, [listbox.source.selected]);

  useEffect(() => {
    dispatch(changeFilterGenre(listbox.genres.selected));
  }, [listbox.genres.selected]);

  useEffect(() => {
    dispatch(startModifyingGames());
  }, [orderBy, orderSense, filterSource, filterGenre]);

  const handleChangeOrderSense = () => {
    // orderSense === 'lower-to-higher'
    //   ? dispatch(changeOrderSense('higher-to-lower'))
    //   : dispatch(changeOrderSense('lower-to-higher'));

    dispatch(
      orderSense === 'lower-to-higher'
        ? changeOrderSense('higher-to-lower')
        : changeOrderSense('lower-to-higher'),
    );
  };

  const handleShowListbox = (option) => {
    dispatch(showListbox(option));
    dispatch(setListboxParent('main'));
  };

  let orderIcon = '';
  switch (orderBy) {
    case 'None':
      orderIcon =
        orderSense === 'lower-to-higher'
          ? 'fas fa-sort-amount-down-alt fa-2x'
          : 'fas fa-sort-amount-down fa-2x';
      break;
    case 'Name':
      orderIcon =
        orderSense === 'lower-to-higher'
          ? 'fas fa-sort-alpha-down fa-2x'
          : 'fas fa-sort-alpha-down-alt fa-2x';
      break;
    case 'Rating':
      orderIcon =
        orderSense === 'lower-to-higher'
          ? 'fas fa-sort-numeric-down fa-2x'
          : 'fas fa-sort-numeric-down-alt fa-2x';
      break;
    case 'Released':
      break;
    default:
      break;
  }

  return (
    <Container>
      <MainSection>
        <PagSection>
          <PagActionsGroup>
            <PagActionsSection>
              <>
                <PagActionBtn
                  theme="primary"
                  onClick={() => handleShowListbox('sorted')}
                >
                  <span>
                    Order by:&nbsp;&nbsp;
                    <strong>{listbox.sorted.selected}</strong>
                  </span>
                  &nbsp;&nbsp;
                  <i className="fas fa-chevron-down" />
                </PagActionBtn>
                {listbox.sorted.visible && listbox.parent === 'main' && (
                  <Listbox
                    listName="sorted"
                    left={0}
                    right="auto"
                    exclude={[]}
                  />
                )}
                <PagUpDownBtn onClick={handleChangeOrderSense}>
                  <i className={orderIcon} />
                </PagUpDownBtn>
              </>
            </PagActionsSection>

            <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.source.selected === 'All' ? 'primary' : 'secondary'
                }
                onClick={() => handleShowListbox('source')}
              >
                <span>
                  Source:&nbsp;&nbsp;
                  <strong>{listbox.source.selected}</strong>
                </span>
                &nbsp; ({render.length}) &nbsp;&nbsp;&nbsp;
                <i className="fas fa-chevron-down" />
              </PagActionBtn>
              {listbox.source.visible && listbox.parent === 'main' && (
                <Listbox listName="source" left={0} right="auto" />
              )}
            </PagActionsSection>

            <PagActionsSection>
              <PagActionBtn
                theme={
                  listbox.genres.selected === 'All' ? 'primary' : 'secondary'
                }
                onClick={() => handleShowListbox('genres')}
              >
                <span>
                  Genres:&nbsp;&nbsp;
                  <strong>{listbox.genres.selected}</strong>
                </span>
                &nbsp; ({render.length})&nbsp;&nbsp;&nbsp;
                <i className="fas fa-chevron-down" />
              </PagActionBtn>
              {listbox.genres.visible && listbox.parent === 'main' && (
                <Listbox listName="genres" left="0" right="auto" />
              )}
            </PagActionsSection>
          </PagActionsGroup>
        </PagSection>

        <ListSection>
          {render.length > 0 &&
            render.map((game, index) => {
              const elementRef =
                render.length - 1 === index ? setElement : null;
              return (
                <Card
                  setElement={
                    filterSource !== 'All' || filterGenre !== 'All'
                      ? null
                      : elementRef
                  }
                  key={game.id}
                  enableDelete={game.id.toString().startsWith('own')}
                  {...game}
                />
              );
            })}
        </ListSection>
      </MainSection>
    </Container>
  );
};

export default MainScreen;
