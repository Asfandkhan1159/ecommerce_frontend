// in this reducer we are updating the product part of our state , forxample updating product list, getting individual products etc
export const productListReducer =(state={product:[]}, action) =>{
switch (action.type){
    case 'PRODUCT_LIST_REQUEST':
        return{loading:true, products:[]}
       case 'PRODUCT_LIST_SUCCESS':
        return {loading:false, products:action.payload} 
        case 'PRODUCT_LIST_FAIL':
            return {loading: false, error: action.payload}
           
        default:
            return state;    
}
}