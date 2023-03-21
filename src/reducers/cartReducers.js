import {CART_ADD_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'
export const cartReducer = (state={cartItems:[],shippingAddress:{}},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            // payload is the product
        const item = action.payload 
        // finding item if its in product using existItem
        const existItem = state.cartItems.find(x => x.product === item.product)
        if(existItem){
            return{
                ...state,
                cartItems:state.cartItems.map(x =>
                    x.product === existItem.product ? item : x
                    )
            }

        } else{
            return{
            ...state,
            cartItems:[...state.cartItems, item]
        }
        }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod:action.payload
            }

    default:
        return state
    }
}
