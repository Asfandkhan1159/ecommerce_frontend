import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps';
import './CartScreen.css'
import {cartItems} from './CartScreen';
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {
    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const navigate = useNavigate();
    if(!shippingAddress.address){
        navigate('/shipping')
    }
    const submitHandler = (e) =>{
        e.preventDefault()
       dispatch(savePaymentMethod(paymentMethod))
       navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>
                Select Method
            </Form.Label>
            <Col>
            <Form.Check
             type='radio'
             label='Paypal or Credit Card'
             id='paypal'
             name='paymentmethod'
             checked
             onChange={(e) => setPaymentMethod(e.target.value)}      
            >

            </Form.Check>
            </Col>
        </Form.Group>

    <Button type='submit' variant='primary'>
        Continue
    </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
