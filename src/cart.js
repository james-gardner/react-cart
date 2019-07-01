import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'
import useStateValue from './state';
import PriceTag from './priceTag'


/**
 * Wrapper for cart items.
 * I've used this as a presentational place holder as it doesn't really do much right now.
 */
export const CartWrapper = ({ children }) => {
  return (
    <div className="cart-wrapper">
      <h2>Items in your cart:</h2>
      {children}
      <CartTotal />
    </div>
  );
  }

/**
 * Display total based on quantity and price.
 * I've tried to localise this from the global state currency settings. Going forward it might be
 * better to use a HOC rather than cutting concerns.
 */
const CartTotal = () => {
  const [ state ] = useStateValue();

  const {
    cart: {
      items
    },
    currency: {
      code,
      rate
    }
  } = state;

  /* Rounding is likely to be off here. */
  const total = items.reduce((memo, item) => {
    const subTotal = item.quantity * item.price * rate

    return memo + subTotal;
  }, 0)

  return <span>Total: {getSymbolFromCurrency(code)}{total.toFixed(2)}</span>
};

/**
 * Render a list of cart items.
 */
export const CartItems = () => {
  const [ state ] = useStateValue();

  const {
    cart: {
      items
    }
  } = state;

  return (
    <ul>
      {
        items.map((props, index) => (
          <CartItem key={`cart-item-${index}`} index={index} {...props} />
        ))
      }
    </ul>
  );
}

/**
 * Render a basic cart item.
 */
export const CartItem = ({
  name,
  price,
  quantity
}) => (
  <li>{name} x {quantity} @ <PriceTag price={price} /> each</li>
);

/**
 * Button component for 'add to cart' functonality.
 * Wired into context so that it's possible to dispatch without prop-drilling.
 */
export const CartButton = ({
  product
}) => {
  /* eslint-disable-next-line */
  const [ state, dispatch ] = useStateValue();

  const action = product => dispatch({
    type: 'ADD_ITEM',
    payload: product
  })

  return (
    <button onClick={() => action(product)}>
      Add to Cart
    </button>
  );
}

/**
 * Cart reducer.
 * Handles CRUD on cart state segment.
 */
export default (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_ITEM':
      // Check if product exists in cart items.
      const index = state.items.findIndex(item => item.id === payload.id);

      // Not found. Add to items.
      if (index === -1) {
        return {
          ...state,
          items: [ ...state.items, { ...payload, quantity: 1 } ]
        }
      }

      // Found. Update quantity.
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === payload.id) {
            item.quantity = item.quantity + 1;
          }

          return item;
        })
      }

    case 'DEL_ITEM':
    default:
      return state;
  }
}