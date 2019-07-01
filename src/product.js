import React from 'react';
import { CartButton } from './cart';
import PriceTag from './priceTag';


/**
 * Render a composite product line view.
 * Acts as a hub between a number of components, spreading state where needed.
 */
export const ProductItem = props => {
  const { name, price } = props;

  return (
    <li>{name} - <PriceTag price={price} /> - <CartButton product={props} /></li>
  );
};

/**
 * Render a basic list of products.
 * Suggestion: Use 'render props' instead for different product views.
 */
export const ProductList = ({
  products
}) => (
  <ul>
    {
      products.map(({ name, id, price }) => (
        <ProductItem key={`product-${id}`} id={id} name={name} price={price} />
      ))
    }
  </ul>
);