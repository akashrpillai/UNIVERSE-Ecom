import React from 'react'
import { Link } from 'react-router-dom'

const CartItemCard = ({ item,removeItem }) => {
  
  return (
    <div className="Cartitemcard">
      <img src={item.image} alt="ProductImage" />
      <div className='firstpart'>
        <Link to={`/product/${item.productId}`}>{item.name.slice(0,12)}...</Link>
        <span>{`price-₹${item.price}`}</span>
        <button onClick={()=>{removeItem(item.productId)}}>Remove</button>
      </div>
    </div>
  )
}

export default CartItemCard