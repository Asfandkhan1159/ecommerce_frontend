import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';


function ProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();

  

// const { loading, error, products } = useSelector(state => state.productList);
const { loading, error, product } = useSelector(state => state.productDetails);
console.log(loading)
console.log(error)
// console.log(products)
useEffect(() => {
  dispatch(listProducts(id));
}, [dispatch,id]);
useEffect(() => {
  dispatch(listProductDetails(id));
}, [dispatch, id]);
useEffect(() =>{
  dispatch(listProductDetails(id))
  console.log('products')
},[])
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  console.log(error)
  return <div>Product Not Found</div>;
}


  
  if (!product) {
    return <div>Product Not Founds</div>;
  }
  
  return (
    <div>
  <Link to="/home" className="btn btn-light my-3">
    Go Back
  </Link>
  {loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Product Not Found</div>
  ) : (
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
            
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  navigate(`/cart/${product.id}?qty=1`);
                }}
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
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
