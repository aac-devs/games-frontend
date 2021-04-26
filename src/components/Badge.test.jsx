/* eslint-disable no-console */
/* eslint-disable no-undef */
// import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';

import React from 'react';
import { shallow } from 'enzyme';
import Badge from './Badge';

describe('Pruebas en el componente <Badge />', () => {
  // test('debe mostrar el mensaje "PlayStation 4"', () => {
  //   const message = 'PlayStation 4';
  //   const { getByText } = render(<Badge text={message} name="platforms" />);
  //   expect(getByText(message)).toBeInTheDocument();
  // });
  test('debe mostrar <Badge /> correctamente', () => {
    const platformText = 'PlayStation 4';
    const wrapper = shallow(<Badge text={platformText} name="platforms" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostrar el name enviado por props', () => {
    const platformText = 'PlayStation 4';
    const wrapper = shallow(<Badge text={platformText} name="platforms" />);
    const readedText = wrapper.find('#text').text();
    expect(readedText).toBe(platformText);
  });
  // TODO: continua en el video 61. Configurar el dotenv para los diferentes entornos.
});
