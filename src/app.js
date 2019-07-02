import React from 'react';
import { StateProvider } from './state';
import cartReducer, {
  CartWrapper,
  CartItems
} from './cart'
import { ProductList } from './product'
import currencyReducer, {
  CurrencySelector
} from './currency';

/**
 * Simulate a remote call to something that returns products.
 */
const getProducts = () => [
  { id: '0000001', name: 'Peas', price: 0.95 },
  { id: '0000002', name: 'Eggs (Dozen)', price: 2.10 },
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
    },

    // Use this to toggle components based on a 'checkout' mode if needed.
    checkout: false
  };

  const reducer = ({ cart, currency, ...state }, action) => {
    return {
      cart: cartReducer(cart, action),
      currency: currencyReducer(currency, action),
      ...state
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <header>
          <h1>Welcome to our Store</h1>
        </header>
        <CurrencySelector />
        <CartWrapper>
          <CartItems />
        </CartWrapper>
        <ProductList products={products} />
      </div>
    </StateProvider>
  );
}

export default App;