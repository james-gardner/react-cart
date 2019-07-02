import React, { useEffect, useState } from 'react';
import { map } from 'lodash/collection';
import axios from 'axios';
import useStateValue from './state';


export const CurrencySelector = () => {
  /* eslint-disable-next-line */
  const [ _, dispatch ] = useStateValue();

  /* Hard-coded for now. Suggest we bring this in from config */
  const url = 'https://api.exchangeratesapi.io/latest?base=GBP';

  /* Rely on local state for demonstration purposes */
  const [ state, setState] = useState({
    currencies: []
  });

  /**
   * Maybe middleware would be a better option here.
   * I've not leveraged the global reducer yet to show a pre-loader or anything like that.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(url);

        /* Safeguard against unexpected responses etc */
        if (!res.data.rates) {
          throw new Error('Unrecognised response from API');
        }

        setState({
          currencies: map(res.data.rates, (rate, code) => ({ code, rate }))
        });
      } catch (err) {
        // TODO. Capture with error boundary.
        throw err;
      }
    };

    /* Can't make useEffect use an async function directly. Call from here. */
    fetchData();
  }, [ url ]);

  /* Leverage the change event to dispatch a call with updated currency */
  const onChange = e => {
    const {
      nativeEvent: {
        target
      }
    } = e;

    dispatch({
      type: 'SET_CURRENCY',
      payload: {
        code: target[target.selectedIndex].text,
        rate: target.value
      }
    })
  }

  return (
    <div className="currency-selector">
      <span>Select Currency: </span>
      <select onChange={onChange}>
      {
        state.currencies.map(({code, rate}) => (
          <option key={`currency-${code}`} value={rate}>{code}</option>
        ))
      }
      </select>
    </div>
  )
};

export default (state, action) => {
  switch(action.type) {
    case 'SET_CURRENCY':
      return {
        ...action.payload
      };

    default:
      return state;
  }
}