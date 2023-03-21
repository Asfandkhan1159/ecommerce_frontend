import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';


const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
