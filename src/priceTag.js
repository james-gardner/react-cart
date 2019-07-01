import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'
import useStateValue from './state';


/**
 * State-aware component to render price based on the currently selected currency.
 */
export default ({ price }) => {
  const [ state ] = useStateValue();

  const {
    currency: {
      code,
      rate
    }
  } = state;

  // Safe-guard in case we migrate away from mock product data.
  const value = parseFloat(price, 10) * rate;

  return (
    <span>{getSymbolFromCurrency(code)}{value.toFixed(2)}</span>
  );
}