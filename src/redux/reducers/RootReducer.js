import { combineReducers } from 'redux';
import { sliderReducer } from '../reducers/SliderReducer';
import { categoryReducer } from '../reducers/CategoryReducer';
import { shopHomeReducer } from '../reducers/ShopHomeReducer';
import { shopNearReducer } from '../reducers/ShopNearReducer';
import { productReducer } from '../reducers/ProductReducer';
import { shopDetailReducer } from '../reducers/ShopDetailReducer';
import { productShopReducer } from '../reducers/ProductShopReducer';
import { shippingFeeReducer } from '../reducers/ShippingFeeReducer';
import { orderAddReducer } from '../reducers/OrderAddReducer';

export const rootReducer = combineReducers({
    sliderReducer: sliderReducer,
    categoryReducer: categoryReducer,
    shopHomeReducer: shopHomeReducer,
    shopNearReducer: shopNearReducer,
    productReducer: productReducer,
    shopDetailReducer: shopDetailReducer,
    productShopReducer: productShopReducer,
    shippingFeeReducer: shippingFeeReducer,
    orderAddReducer: orderAddReducer
});
