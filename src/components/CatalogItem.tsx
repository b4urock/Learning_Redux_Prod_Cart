import React, { useCallback } from 'react';
import { IProduct } from '../store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IState } from '../store';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const isOutofStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.outOfStock.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
   }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span> {"  "}

      <button 
          type="button"
          onClick={handleAddProductToCart}
        >
          Comprar
      </button>

      {isOutofStockCheck && <span style={{ color: 'red'}}>Sem Estoque</span>}
    </article>
  );
}

export default CatalogItem;