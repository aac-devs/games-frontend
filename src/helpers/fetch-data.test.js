/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import fetchingData from './fetch-data';

describe('Pruebas con fetch-data.js', () => {
  test('pruebas con el GET: debe retornar todos los géneros', async () => {
    const endpoint = 'games/genres';
    const resp = await fetchingData(endpoint);
    const data = await resp.json();
    expect(data.ok).toBe(true);
    expect(data.count).toBe(19);
    expect(data).toBeInstanceOf(Object);
    expect(data.results).toBeInstanceOf(Array);
    expect(data.results.length).toBe(19);
    expect(data.results[0]).toEqual({
      id: 4,
      name: 'Action',
    });
  });
  test('pruebas con el POST: debe poder crear un nuevo juego', async () => {
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
    // TODO:, buscar la manera de devolver el id desde el backend cuando se crea el juego, esto para poder borrarlo al hacer las pruebas. cambiar la url de fetch para hacer las prueba con la base de datos local 'games_test' (probar con dotenv).

    // const endpoint = 'games/create';
    // const method = 'POST';
    // const resp = await fetchingData(endpoint, data, method);
    // const { ok, msg } = await resp.json();
    // expect(ok).toBe(true);
    // expect(msg).toBe('Videogame created successfully!');
  });
});
