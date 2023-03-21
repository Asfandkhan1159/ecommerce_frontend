import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';
import { CART_ADD_ITEM } from '../constants/cartConstants';

function CartScreen({ match, location, history }) {
  const { id } = useParams();
  const productId = id;
  console.log('Product ID is :', productId)

  // Extract quantity from the URL query string
  const qty = new URLSearchParams(useLocation().search).get('qty');
  
  console.log('total quantity is :' , qty);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log('cart items :', cartItems)
  const navigate = useNavigate();
  const handleProceedToCheckout = () =>{
    navigate('/shipping')
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const itemsTotal = cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    const qty = Number(item.qty);
    if (isNaN(price) || isNaN(qty)) {
      return acc;
    }
    return acc + price * qty;
  }, 0).toFixed(2);
  console.log(itemsTotal)
  console.log(subtotal)

  

  return (
    <Row>
      <Col md={8}>
        <h1>My Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your Cart is Empty <Link to='/home'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${Number(item.price * item.qty).toFixed(2)}</Col>

                  <Col md={1}>{item.qty}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}) items
 </h2>
            <h3 className='text-right'>${subtotal}</h3>
           
          </ListGroup.Item>
          <ListGroup.Item className='text-right'>
            <Button onClick={handleProceedToCheckout} className='btn-block'>Proceed to Checkout</Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default CartScreen;
