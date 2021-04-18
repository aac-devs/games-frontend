import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import dayjs from "dayjs";

import { backgroundColor, textColor } from "../../global-styles";
import {
  hideDatePicker,
  hideRatingPicker,
  setListboxParent,
  setSelectedOption,
  showDatePicker,
  showListbox,
  showRatingPicker,
  startLoadingListboxGenres,
  startLoadingListboxPlatforms,
} from "../../actions/components.actions";
import { Badge, Rating, Listbox, DateBox } from "../index";
import {
  changeInputValue,
  cleanArrays,
  setCurrentScreen,
  setTemporaryImage,
  startCreatingNewGame,
  startLoadingArrays,
} from "../../actions/games.actions";

const Container = styled.div`
  margin: 0 auto;
  max-width: 768px;
`;

const Grid = styled.div`
  min-width: 300px;
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
`;

const ImageSection = styled.div`
  box-shadow: 0px 0px 5px rgba(200, 200, 200, 0.5);
  background-color: ${backgroundColor.primary.dark};
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(90%);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
  cursor: pointer;
  border-radius: 10px;
  color: ${backgroundColor.primary.normal};
  min-width: 300px;
  max-width: 400px;
  width: 100%;
  min-height: 280px;
  height: 280px;
  .edit {
    opacity: 0.4;
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const DataSection = styled.div`
  height: 100%;
  background-color: ${backgroundColor.primary.dark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  max-width: 400px;
  min-height: 280px;
  height: 280px;
  width: 100%;
  box-shadow: 0px 0px 5px rgba(200, 200, 200, 0.5);
  border-radius: 10px;
  padding: 10px;
`;

const DataName = styled.div`
  margin-bottom: 10px;
  input {
    color: ${textColor.primary.light};
    padding: 16px 20px;
    font-size: 18px;
    background-color: ${backgroundColor.primary.normal};
    border: 1px solid ${textColor.primary.dark};
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    ::placeholder {
      color: ${backgroundColor.primary.light};
      font-size: 18px;
    }
  }
`;

const DataDescription = styled.div`
  font-family: "Roboto", sans-serif, Helvetica, Arial;

  flex-grow: 1;
  margin-bottom: 10px;
  textarea {
    resize: none;
    color: ${textColor.primary.light};
    padding: 16px 20px;
    font-size: 18px;
    background-color: ${backgroundColor.primary.normal};
    border: 1px solid ${textColor.primary.dark};
    border-radius: 5px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    ::placeholder {
      color: ${backgroundColor.primary.light};
      font-size: 18px;
    }
  }
`;

const DataFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const DataRating = styled.div`
  position: relative;
  margin-left: 12px;
`;

const DataReleased = styled.div`
  flex-grow: 1;
`;

const ReleasedRatingTitle = styled.div`
  font-size: 16px;
  color: ${textColor.primary.dark};
  margin-bottom: 8px;
`;

const ReleasedBody = styled.div`
  background-color: ${backgroundColor.primary.normal};
  border-radius: 24.5px;
  font-size: 16px;
  color: ${textColor.primary.light};
  padding: 15px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  i {
    margin-right: 8px;
    color: ${textColor.primary.dark};
  }
`;

const RatingBody = styled(ReleasedBody)`
  width: 90px;
  i {
    margin-right: 8px;
  }
`;

const GenresPlatFormsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  padding: 10px 10px 3px 10px;
  min-width: 300px;
  max-width: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(200, 200, 200, 0.5);
`;

const GenresPlatFormsLabel = styled.div`
  position: relative;
`;

const GenresPlatFormsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  margin-bottom: 7px;
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

const CrudPage = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const { listbox, ratingPicker, datePicker } = useSelector(
    (state) => state.components
  );
  const {
    detailedGame,
    platforms: platformsSource,
    genres: genresSource,
    temporaryImage,
  } = useSelector((state) => state.games);

  const inputFile = useRef(null);

  useEffect(() => {
    dispatch(cleanArrays());
    dispatch(startLoadingArrays("genres", "games/genres"));
    dispatch(startLoadingArrays("platforms", "games/platforms"));
    if (params.id) {
      dispatch(setCurrentScreen("update"));
      dispatch(startLoadingArrays("detailedGame", `games/detail/${params.id}`));
    } else {
      dispatch(setCurrentScreen("create"));
      dispatch(startCreatingNewGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detailedGame[0]?.genres.length > 0) {
      dispatch(startLoadingListboxGenres(false));
    }
    if (detailedGame[0]?.platforms.length > 0) {
      dispatch(startLoadingListboxPlatforms());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailedGame[0]]);

  useEffect(() => {
    // if (listbox.genres.selected !== "Genres") {
    if (listbox.genres.selected !== "All") {
      const newGenre = genresSource.filter(
        (g) => g.name === listbox.genres.selected
      );
      handleInputChange({
        target: {
          name: "genres",
          value: [...detailedGame[0].genres, ...newGenre],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listbox.genres.selected]);

  useEffect(() => {
    if (listbox.platforms.selected !== "Platforms") {
      const newPlatform = platformsSource.filter(
        (p) => p.name === listbox.platforms.selected
      );
      handleInputChange({
        target: {
          name: "platforms",
          value: [...detailedGame[0].platforms, ...newPlatform],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listbox.platforms.selected]);

  if (detailedGame[0]?.name === undefined) {
    return <></>;
  }

  const {
    image,
    name,
    released,
    rating,
    description,
    genres,
    platforms,
  } = detailedGame[0];

  // useEffect(() => {
  //   // dispatch(clearArrays());
  //   if (main.data.genres.length === 0) {
  //     // dispatch(startLoadingPlatformsGenres("genres"));
  //   }
  //   if (main.data.platforms.length === 0) {
  //     // dispatch(startLoadingPlatformsGenres("platforms"));
  //   }
  //   if (currentScreen === "create") {
  //     // dispatch(startSettingEditGame("new"));
  //   }
  //   if (currentScreen === "update") {
  //     console.log("Estoy en Crud Page");
  //     console.log(params.id);
  //     // dispatch(startLoadingDetailedGame(params.id));
  //     // dispatch(startSettingEditGame("edit"));
  //   }

  //   return () => {
  //     // dispatch(setEditGame(null));
  //     // dispatch(setSelectedOption({ destination: "genres", option: "Genres" }));
  //     // dispatch(
  //     //   setSelectedOption({ destination: "platforms", option: "Platforms" })
  //     // );
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (!main.data.editGame) {
  //   return <div>Espere..</div>;
  // }

  const handleImageClick = () => inputFile.current.click();

  const handleImageChangePreview = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      dispatch(setTemporaryImage(reader.result));
    };
  };

  const handleArrayRemoveGenre = (id) => {
    const value = genres.filter((g) => g.id !== id);
    handleInputChange({ target: { name: "genres", value } });
  };

  const handleArrayRemovePlatform = (id) => {
    const value = platforms.filter((p) => p.id !== id);
    handleInputChange({ target: { name: "platforms", value } });
  };

  const handleSelectedDate = (value) => {
    handleInputChange({ target: { name: "released", value } });
    dispatch(hideDatePicker());
  };

  const handleRating = (value) => {
    handleInputChange({ target: { name: "rating", value: parseFloat(value) } });
    dispatch(hideRatingPicker());
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(changeInputValue({ name, value }));
  };

  // TODO: para crear un juego nuevo, inicializar detailedGame con los valores en blanco y SIN incluir id

  const handleShowListbox = (option) => {
    dispatch(showListbox(option));
    dispatch(setListboxParent("crud"));
  };

  return (
    <Container>
      <Grid>
        <ImageSection
          image={`${
            temporaryImage ? temporaryImage : image ? image : "/no-image.jpg"
          }`}
          onClick={handleImageClick}
        >
          <i className="far fa-edit fa-5x edit"></i>
          <input
            ref={inputFile}
            type="file"
            name="file"
            style={{ display: "none" }}
            onChange={handleImageChangePreview}
          />
        </ImageSection>

        <DataSection>
          <DataName>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="name"
              value={name}
            />
          </DataName>
          <DataDescription>
            <textarea
              name="description"
              maxLength={200}
              onChange={handleInputChange}
              placeholder="description"
              value={description}
            />
          </DataDescription>
          <DataFooter>
            <DateBox
              handleSelectedDate={handleSelectedDate}
              show={datePicker.show}
              handleSelectedDateClose={() => dispatch(hideDatePicker())}
              currentDate={released}
            />
            <DataReleased>
              <ReleasedRatingTitle>Release date</ReleasedRatingTitle>
              <ReleasedBody onClick={() => dispatch(showDatePicker())}>
                <i className="far fa-calendar-alt"></i>
                {dayjs(released).format("MMMM D, YYYY")}
              </ReleasedBody>
            </DataReleased>
            <DataRating>
              <Rating
                show={ratingPicker.show}
                currentRating={rating}
                handleChangeRating={handleRating}
                handleChangeRatingClose={() => dispatch(hideRatingPicker())}
              />
              <ReleasedRatingTitle>Rating</ReleasedRatingTitle>
              <RatingBody onClick={() => dispatch(showRatingPicker())}>
                <i className="far fa-star"></i>
                {rating}
              </RatingBody>
            </DataRating>
          </DataFooter>
        </DataSection>

        <GenresPlatFormsSection>
          <GenresPlatFormsLabel>
            <PagActionBtn
              theme={
                // listbox.genres.selected === "Genres" ? "primary" : "secondary"
                listbox.genres.selected === "All" ? "primary" : "secondary"
              }
              // onClick={() => dispatch(showListbox("genres"))}
              onClick={() => handleShowListbox("genres")}
            >
              <span>Add genre</span>
              <i className="fas fa-chevron-down"></i>
            </PagActionBtn>
            {listbox.genres.visible && listbox.parent === "crud" && (
              <Listbox
                listName="genres"
                left="0"
                right="auto"
                top="-150px"
                exclude={genres.map((g) => g.name)}
              />
            )}
          </GenresPlatFormsLabel>
          <GenresPlatFormsContent>
            {genres.map((genre, index) => (
              <Badge
                key={index}
                id={genre.id}
                name="genres"
                text={genre.name}
                hasCloseButton={true}
                handleClose={handleArrayRemoveGenre}
              />
            ))}
          </GenresPlatFormsContent>
        </GenresPlatFormsSection>

        <GenresPlatFormsSection>
          <GenresPlatFormsLabel>
            <PagActionBtn
              theme={
                listbox.platforms.selected === "Platforms"
                  ? "primary"
                  : "secondary"
              }
              // onClick={() => dispatch(showListbox("platforms"))}
              onClick={() => handleShowListbox("platforms")}
            >
              <span>Add Platform</span>
              <i className="fas fa-chevron-down"></i>
            </PagActionBtn>
            {listbox.platforms.visible && listbox.parent === "crud" && (
              <Listbox
                listName="platforms"
                left="0"
                right="auto"
                top="-150px"
                exclude={platforms.map((g) => g.name)}
              />
            )}
          </GenresPlatFormsLabel>
          <GenresPlatFormsContent>
            {platforms.map((platform, index) => (
              <Badge
                key={index}
                id={platform.id}
                name="platforms"
                text={platform.name}
                hasCloseButton={true}
                handleClose={handleArrayRemovePlatform}
              />
            ))}
          </GenresPlatFormsContent>
        </GenresPlatFormsSection>
      </Grid>
    </Container>
  );
};

export default CrudPage;
