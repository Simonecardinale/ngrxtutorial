import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {ShopFilters} from '../../../model/shop-filters';
import {ShopFiltersActions} from './shop-filters.actions';
import {selectList} from '../products/products.feature';


const initialState: ShopFilters = {
  text: '',
  cost: 2,
  wood: true,
  plastic: true,
  paper: true
}

export const shopFiltersFeature = createFeature({
  name: "shopFilters",
  reducer: createReducer(
    initialState,
    on(ShopFiltersActions.update, (state, action): ShopFilters => ({...state, ...action.filters}))
  ),
  extraSelectors: ({selectShopFiltersState}) => ({
    selectFilteredList: createSelector(
      selectList,
      selectShopFiltersState,
      (list, shopFilters) => list
        .filter(el => el.name.toLocaleLowerCase().includes(shopFilters.text.toLocaleLowerCase()))
        .filter(el => el.cost <= shopFilters.cost)
        .filter(p => {
          return (shopFilters.wood && p.type === 'wood') ||
            (shopFilters.paper && p.type === 'paper') ||
            (shopFilters.plastic && p.type === 'plastic')
        })
    )
  })
})

export const {
  selectText,
  selectCost,
  selectWood,
  selectPaper,
  selectPlastic,
  selectShopFiltersState,
  selectFilteredList
} = shopFiltersFeature
