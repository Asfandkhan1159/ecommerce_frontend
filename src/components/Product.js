import React from 'react'
import { Card } from 'react-bootstrap'
import Rating  from './Rating'
import {Link} from 'react-router-dom'
function Product({product}) {
  // console.log(product)
  return (
    <Card className='my-3 p-3 rounded'>
   <Link to={`/product/${product.id}`}>
    <Card.Img src={product.image}/>
   </Link>
   <Card.Body>
   <Link to={`/product/${product.id}`}>
    <Card.Title as="div"> 
        <strong>
            {product.title}
        </strong>
    </Card.Title>
   </Link>
   <Card.Text as='div'>
   <div className='my-3'>

    <Rating value={product.rating.rate} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
   </div>

   </Card.Text>
   <Card.Text as='h3'>
    ${product.price}
   </Card.Text>
   </Card.Body>
    </Card>
  )
}

export default Product
