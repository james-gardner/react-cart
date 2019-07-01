import React from 'react';
import useStateValue from './state';
import PriceTag from './priceTag'


/**
 * Wrapper for cart items.
 * I've used this as a presentational place holder as it doesn't really do much right now.
 */
export const CartWrapper = ({ children }) => (
  <div className="cart-wrapper">
    {children}
    <CartTotal />
  </div>
);

/**
 */
const CartTotal = () => {

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
  <li>{name} - {quantity} @ <PriceTag price={price} /> each</li>
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