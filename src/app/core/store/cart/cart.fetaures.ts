import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import {Product} from '../../../model/products';

export type CartItem = {
  product: Product;
  qty: number;
}

export interface CartState {
  // NEW
  list: CartItem[];
}

const initialState: CartState =  {
  list: []
}

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.add, (state, action) => {
      const productAlreadyInCart = state.list.find(item => item.product.id === action.item.id);

      if (productAlreadyInCart) {
        // increase qty
        return ({
          ...state, list: state.list.map(item => {
            return item.product.id === action.item.id ? {...item, qty: item.qty + 1} : item;
          })
        })
      } else {
        // add in cart
        const cartItem: CartItem = { product: action.item, qty: 1};
        return ({
          ...state, list: [...state.list, cartItem]
        })
      }
    }),
    on(CartActions.remove, (state, action) => ({
      ...state,
      list: state.list.filter(item => item.product.id !== action.id)
    })),
    on(CartActions.increaseQuantity, (state, action) => {
      return ({
        ...state, list: state.list.map(item => {
          return item.product.id === action.id ? {...item, qty: item.qty + 1} : item;
        })
      })
    }),
    on(CartActions.decreaseQuantity, (state, action) => {
      const productAlreadyInCart = state.list.find(item => item.product.id === action.id);
      if (productAlreadyInCart && productAlreadyInCart.qty > 1) {
        // decrease
        return ({
          ...state, list: state.list.map(item => {
            return item.product.id === action.id ? {...item, qty: item.qty - 1} : item;
          })
        })
      }
      // delete
      return {
        ...state,
        list: state.list.filter(item => item.product.id !== action.id)
      }
    }),
    on(CartActions.loadedFromLocalStorage, (state, action) => {
      return {
        ...state,
        list: action.items
      }
    }),
    on(CartActions.clear, (state) => ({list: []}))
  ),
  extraSelectors: ({ selectList }) => ({
    selectIsCartEmpty: createSelector(
      selectList,
      (list) => list.length === 0
    ),
    selectTotalCartItems: createSelector(
      selectList,
      (list) => list.length
    ),
    selectTotalCartCost: createSelector(
      selectList,
      (list) => list.reduce((total, item) => total + (item.product.cost * item.qty), 0)
    )
  })
});

export const {
  selectList,
  selectIsCartEmpty,
  selectTotalCartItems,
  selectTotalCartCost,
} = cartFeature;
