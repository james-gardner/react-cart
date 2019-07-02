import React from 'react';
import { shallow } from 'enzyme';
import { CartItem } from '../cart';

describe('CartItem', () => {
  it('renders', () => {
    shallow(<CartItem name="test" price={1.00} quantity={1} />)
  });
});