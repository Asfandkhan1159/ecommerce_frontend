import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'



import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps';
import {cartItems} from './CartScreen';
function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
               <ListGroup.Item>
                <h2>Shipping </h2>
                <p> 
                    <strong>Shipping: </strong>
                    {cart.shippingAddress.address},
                    {cart.shippingAddress.city}
                    {' '}
                    {cart.shippingAddress.postalCode}, 
                    {' '}
                    {cart.shippingAddress.country}
                </p>
                </ListGroup.Item> 
                 <ListGroup.Item>
                <h2>Payment Method </h2>
                <p> 
                    <strong>Method: </strong>
                    {cart.payment.method},
                 
                </p>
                </ListGroup.Item> 

            </ListGroup>
        </Col>
        <Col md={4}>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
