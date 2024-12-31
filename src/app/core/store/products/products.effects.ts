import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProductsActions} from './products.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../../model/products';
import {CartActions} from '../cart/cart.actions';


export const loadProducts = createEffect(() => {
  const actions$ = inject(Actions);
  const http= inject(HttpClient);
  return actions$.pipe(
    ofType(ProductsActions.load),
    mergeMap(() => http.get<Product[]>('http://localhost:3001/products')
      .pipe(
        map((item) => {
          console.log(item)
          return ProductsActions.loadSuccess({item})
        })
      )
    ),
    catchError((error) => {
      return of(ProductsActions.loadFailed())
    })
  )
},
  {functional: true}
)

export const deleteProduct = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(ProductsActions.deleteProduct),
    mergeMap((item) => http.delete<Product>(`http://localhost:3001/products/${item.id}`)
      .pipe(
        map((el) => ProductsActions.deleteProductSuccess({id: item.id})),
        catchError(() => of(ProductsActions.deleteProductFail()))
      )
    )
  )
}, {functional: true})

export const createProduct = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(ProductsActions.addProduct),
    mergeMap((action) => http.post<Product>("http://localhost:3001/products", action.item)
      .pipe(
        map((item) => ProductsActions.addProductSuccess({item: action.item as Product})),
        catchError(() => of(ProductsActions.addProductFail()))
      )
    )
  )
}, {functional: true})


export const editProducts = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(ProductsActions.editProduct),
    mergeMap((action) => http.patch<Product>(`http://localhost:3001/products/${action.item.id}`, action.item)
    .pipe(
      map((item) => ProductsActions.editProductSuccess({item})),
      catchError(() => of(ProductsActions.editProductFail()))
      )
    )
  )
}, {functional: true})
