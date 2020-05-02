import {combineReducers} from 'redux';
import {SignUpForShopReducer} from './reducer/SignUpForShopReducer'
import {SignUpForCustomerReducer} from './reducer/SignUpForCustomerReducer'
import {ShopInformationReducer} from './reducer/ShopInformationReducer'

export { SignUpForShop_one }from './action/SignUpForShopAction'
export { SignUpForShop_two }from './action/SignUpForShopAction'
export { SignUpForCustomer_one }from './action/SignUpForCustomerAction'
export { SignUpForCustomer_two }from './action/SignUpForCustomerAction'
export { Information } from './action/ShopInformationAction'
export { Colorstock } from './action/ShopInformationAction'
// export { AddColorstock } from './action/ShopInformationAction'
export { HairStyleswomenLong } from './action/ShopInformationAction'
export { HairStyleswomenMedium } from './action/ShopInformationAction'
export { HairStyleswomenShort } from './action/ShopInformationAction'
export { HairStylesmenLong } from './action/ShopInformationAction'
export { HairStylesmenShort } from './action/ShopInformationAction'
export { BarberDetail } from './action/ShopInformationAction'
export { PriceListDetail } from './action/ShopInformationAction'

export default combineReducers ({
    SignUpForShopReducer,
    SignUpForCustomerReducer,
    ShopInformationReducer
})