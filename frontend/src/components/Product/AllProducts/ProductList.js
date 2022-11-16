import React, { Fragment } from 'react'
import NewProductCard from './NewProductCard'
const ProductList = ({ products }) => {
  return (
    <Fragment>
      {products && products.map((product) => {
        return (
          <NewProductCard key={product._id} product={product} />
        )
      })}
    </Fragment>
  )
}

export default ProductList