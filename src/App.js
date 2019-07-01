import React from 'react';
import { StateProvider } from './state';
import cartReducer, {
  CartWrapper,
  CartItems
} from './cart'
import {
  ProductList
} from './product'

/**
 * Simulate a remote call to something that returns products.
 */
const getProducts = () => [
  { id: '0000001', name: 'Peas', price: 0.95 },
  { id: '0000002', name: 'Eggs', price: 2.10 },
  { id: '0000003', name: 'Milk', price: 1.30 },
  { id: '0000004', name: 'Beans', price: 0.73 }
];

/**
 * Main entry point.
 */
const App = () => {
  const products = getProducts();

  const initialState = {
    cart: {
      items: []
    },
    currency: {
      code: 'GBP',
      rate: 1.0
    }
  };

  const reducer = ({ cart, ...state }, action) => {
    return {
      cart: cartReducer(cart, action),
      ...state
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <CartWrapper>
          <CartItems />
        </CartWrapper>
        <h2>Products</h2>
        <ProductList products={products} />
      </div>
    </StateProvider>
  );
}

export default App;