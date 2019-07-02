import React from 'react';
import PropTypes from 'prop-types';
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
};

CartWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};


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
export const CartItem = props => {
  const {
    name,
    price,
    quantity
  } = props;

  return (
    <li className="cart-item">{name} x {quantity} @ <PriceTag price={price} /> each <RemoveFromCartButton product={props} /></li>
  );
}

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
};

/**
 * Button component for 'add to cart' functonality.
 * Wired into context so that it's possible to dispatch without prop-drilling.
 */
export const AddToCartButton = ({
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
};

AddToCartButton.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
};

/**
 * TODO: This is very similar to AddToCart so it might be possible to wrap a generic
 * button with a dispatch call and label (currying?).
 */
export const RemoveFromCartButton = ({
  product
}) => {
  /* eslint-disable-next-line */
  const [ state, dispatch ] = useStateValue();

  const action = product => dispatch({
    type: 'DEL_ITEM',
    payload: product
  })

  return (
    <button onClick={() => action(product)}>
      Remove
    </button>
  );
};

RemoveFromCartButton.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
};

/**
 * Cart reducer.
 * Handles CRUD on cart state segment.
 *
 * TODO: Refactor manipulation methods:
 * https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
 */
export default (state, action) => {
  const { payload } = action;


  /* Check if product exists in cart items. Both ops currently require this. */
  const index = state.items.findIndex(item => {
    return item.id === payload.id
  });

  switch (action.type) {
    case 'ADD_ITEM':
      /* Not found. Add to items.*/
      if (index === -1) {
        return {
          ...state,
          items: [ ...state.items, { ...payload, quantity: 1 } ]
        }
      }

      /* Found. Update quantity. */
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
      /* Note Found. Ignore. */
      if (index === -1) return state;

      const item = state.items[index];

      if (item.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item, i) => i !== index)
        }
      }

      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === payload.id) {
            item.quantity = item.quantity - 1;
          }

          return item;
        })
      }

    default:
      return state;
  }
}