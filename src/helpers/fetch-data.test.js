/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import fetchingData from './fetch-data';

describe('Pruebas con fetch-data.js', () => {
  const data = {
    name: 'Crash Bandicoot 2021',
    description: 'Esta es la nueva descripción..',
    image:
      'https://res.cloudinary.com/aac-devs-data/image/upload/v1619218710/VideoGames/p5z7iqkhdeu35eudwvbt.jpg',
    released: dayjs().format('MMMM D, YYYY'),
    rating: 3.8,
    genres: [
      { id: 5, name: 'RPG' },
      { id: 2, name: 'Shooter' },
    ],
    platforms: [
      { id: 2, name: 'PlayStation' },
      { id: 3, name: 'Xbox' },
    ],
  };
  let gameId = '';

  test('pruebas con el GET: debe retornar todos los géneros', async () => {
    const endpoint = 'games/genres';
    const resp = await fetchingData(endpoint);
    const genres = await resp.json();
    const { ok, count, results } = genres;
    expect(ok).toBe(true);
    expect(count).toBe(19);
    expect(genres).toBeInstanceOf(Object);
    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBe(19);
    expect(results[0]).toEqual({
      id: 4,
      name: 'Action',
    });
  });

  test('pruebas con el GET: debe poder retornar el detalle del juego con id 3498', async () => {
    const endpoint = 'games/detail/3498';
    const resp = await fetchingData(endpoint);
    const {
      ok,
      result: { id, name, released, rating },
    } = await resp.json();
    expect(ok).toBe(true);
    expect(id).toBe('3498');
    expect(name).toBe('Grand Theft Auto V');
    expect(released).toBe('2013-09-17');
    expect(rating).toBe(4.48);
  });

  test('pruebas con el POST: debe poder crear un nuevo juego', async () => {
    const endpoint = 'games/create';
    const method = 'POST';
    const resp = await fetchingData(endpoint, data, method);
    const { ok, id, msg } = await resp.json();
    gameId = id;
    expect(ok).toBe(true);
    expect(msg).toBe('Videogame created successfully!');
  });

  test('prubas con el PUT: debe poder actualizar un juego creado', async () => {
    data.name = 'Nuevo nombre';
    const endpoint = `games/edit/${gameId}`;
    const method = 'PUT';
    const resp = await fetchingData(endpoint, data, method);
    const { ok, id, msg } = await resp.json();
    expect(id).toBe(gameId);
    expect(ok).toBe(true);
    expect(msg).toBe('Videogame updated successfully!');
  });

  test('pruebas con el DELETE: debe poder borrar el juego creado', async () => {
    const endpoint = `games/delete/${gameId}`;
    const method = 'DELETE';
    const resp = await fetchingData(endpoint, null, method);
    const { ok, msg } = await resp.json();
    expect(ok).toBe(true);
    expect(msg).toBe('Videogame deleted successfully');
  });
});
