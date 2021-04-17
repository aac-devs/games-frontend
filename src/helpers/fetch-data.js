// const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = "https://aac-games-app.herokuapp.com";

export const fetchingData = (endpoint, data, method = "GET", page = 1) => {
  // console.log("fetch-data:");
  // console.log(data);
  const url = `${baseUrl}/${endpoint}`;
  if (method === "GET") {
    return fetch(url, {
      method,
    });
  } else if (method === "DELETE") {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
