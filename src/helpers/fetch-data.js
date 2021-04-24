// const baseUrl = 'https://aac-games-app.herokuapp.com';
const baseUrl = 'http://localhost:8080';

const fetchingData = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url, {
      method,
    });
  }
  if (method === 'DELETE') {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export default fetchingData;
