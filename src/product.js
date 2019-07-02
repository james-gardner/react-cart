import React from 'react';
import PropTypes from 'prop-types';
import { AddToCartButton } from './cart';
import PriceTag from './priceTag';


/**
 * Render a composite product line view.
 * Acts as a hub between a number of components, spreading state where needed.
 */
export const ProductItem = props => {
  const { name, price } = props;

  return (
    <li className="line-item">{name} - <PriceTag price={price} /> <AddToCartButton product={props} /></li>
  );
};

ProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

/**
 * Render a basic list of products.
 * Suggestion: Use 'render props' instead for different product views.
 */
export const ProductList = ({
  products
}) => (
  <div className="product-wrapper">
    <h2>Our Latest Products</h2>
    <ul>
      {
        products.map(({ name, id, price }) => (
          <ProductItem key={`product-${id}`} id={id} name={name} price={price} />
        ))
      }
    </ul>
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  )
};