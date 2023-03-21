import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';



function ProductScreen({}) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  // incremenet and decerement buttons
  // const handleDecrement = () => {
  //   if (qty > 1) {
  //     setQty(qty - 1);
  //   }
  // }

  // const handleIncrement = () => {
  //   if (qty < product.countInStock) {
  //     setQty(qty + 1);
  //   }
  // }
  

// const { loading, errors, products } = useSelector(state => state.productList);
const { loading, error, product } = useSelector(state => state.productDetails);

console.log(loading)
// console.log(error)
// console.log(products)
useEffect(() => {
  dispatch(listProducts(id));
}, [dispatch,id]);
useEffect(() => {
  dispatch(listProductDetails(id));
}, [dispatch, id]);
const useAddToCartHandler = () =>{
  
 navigate(`cart/${product.id}?qty=${qty}`)
}
// useEffect(() =>{
//   dispatch(listProductDetails(id))
//   console.log(product)
// },[])
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  console.log(error)
  return <Message>Product Not Found</Message>;
}


  
  if (!product) {
    return <Message>Product Not Founds</Message>;
  }
  
  return (
    <div>
  <Link to="/home" className="btn btn-light my-3">
    Go Back
  </Link>
  {loading ? 
    <Loader/>
   : error ? 
    <Message variant='danger'>{error}</Message>
   : (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.title} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.title}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
            
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                
                <Col>Status:</Col>
                <Col>{product.rating && product.rating.count > 0 ? 'In Stock' : 'Out of Stock'}</Col>
               
              </Row>
            </ListGroup.Item>
            {product.rating && product.rating.count > 0 &&(
              <ListGroupItem>
               <Col xs='auto' className='my-1'>
  <div className="d-flex">
    <Button
      className="mx-1"
      variant="secondary"
      disabled={qty === 1}
      onClick={() => setQty(qty - 1)}
    >
      -
    </Button>
    <span className="mx-2">{qty}</span>
    <Button
      className="mx-1"
      variant="secondary"
      disabled={qty >= product.rating.count}
      onClick={() => setQty(qty + 1)}
    >
      +
    </Button>
  </div>
</Col>


              </ListGroupItem>
            )}
            <ListGroup.Item>
              <Button
                onClick={useAddToCartHandler}
                className="btn-block"
                type="button"
                disabled={product.rating && product.rating.count === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )}
</div>

  );
}

export default ProductScreen;
