import axios from 'axios'
import {CART_ADD_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'
// getState lets us get any part of state e.g getting cart form store.. just like useselector where we can pull the entire state

export const addToCart = (id, qty) => async(dispatch, getState) => {
  const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`)
  console.log(data)
  
  dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data.id,
        name:data.title,
        image:data.image,
        price:data.price,
        count:data.rating.count,
        qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress = (data) => (dispatch) =>{
  dispatch({
    type:CART_SAVE_SHIPPING_ADDRESS,
    payload:data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) =>{
  dispatch({
    type:CART_SAVE_PAYMENT_METHOD,
    payload:data
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}


// extracting cart from store