import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Product} from '../../../model/products';


export const ProductsActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{item: Product[]}>(),
    'Load Failed': emptyProps(),
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Fail': emptyProps(),
    'Add Product': props<{ item: Partial<Product> }>(),
    'Add Product Success':  props<{ item: Product }>(),
    'Add Product Fail': emptyProps(),
    'Edit Product': props<{ item: Partial<Product> }>(),
    'Edit Product Success':  props<{ item: Product }>(),
    'Edit Product Fail': emptyProps(),
    'Open Modal Add': emptyProps(),
    'Open Modal Edit': props<{ item: Partial<Product>} >(),
    'Close Modal': emptyProps(),
  }
})
