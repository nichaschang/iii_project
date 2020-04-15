import { combineReducers } from 'redux'

// stacey
import {
  getCouponData,
  filterCoupon,
  memberCouponData,
  adData,
  memberLikeData,
  couponTotal,
  countdownCouponData,
  
} from '../stacey/reducer/couponReducer'

//chin
import {
  getItems,
  getItemId,
  getMultipleItemId,
  getListitemName,
  reset,
  getListitemPrice,
  getItemNamehis,
  getitemCategoryId,
  getItemscompare,
  getListitemPrice2,
  getUsersData,
  //getcompare,
  showDiscount,
} from '../chin/reducer/itemsReducer'

//mao
import {
  AddItem,
  getShop,
  calculator,
  calculator_total,
  MyFavorite,
  ControlDataState,
  getOrderBuyer,
  saveOrderBuyerInfoReducer,
  saveOrderBuyerProReducer,
  getRANDitemid,saveCoupon,saveDiscount,
  cartCouponData,
} from '../mao/reducers/ShopCartReducer'
import {
  getMemberID,
  member,
  updateMember,
  getMemberOrder,
} from '../Irene/reducers/memberReducer'

//老師範例
// 第一步：建立reducer
// action = {type, value}
// type: ADD_VALUE, MINUS_VALUE
// ex. action = {type: 'ADD_VALUE', value: 10}

// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case 'ADD_VALUE':
//       return state + action.value
//     case 'MINUS_VALUE':
//       return state - action.value
//     default:
//       return state
//   }
// }

// 合併多個reducer (必要，為了要配合瀏覽器開發外掛使用)
const rootReducer = combineReducers({
  memberCouponData,
  getCouponData,
  adData,
  memberLikeData,
  couponTotal,
  filterCoupon,
  countdownCouponData, //sty
  getItems,
  getItemId,
  getMultipleItemId,
  getListitemName,
  reset,
  getListitemPrice,
  getItemNamehis,
  getitemCategoryId,
  getItemscompare,
  getListitemPrice2,
  getUsersData,
  // getcompare,
  showDiscount,//chin
  //--------- ShopCart------------
  AddItem,
  getRANDitemid,
  getShop,
  calculator,
  calculator_total,
  MyFavorite,
  ControlDataState,
  getOrderBuyer,
  saveOrderBuyerInfoReducer,
  saveOrderBuyerProReducer,saveCoupon,saveDiscount,cartCouponData,
  //member
  member,
  getMemberID,
  updateMember,
  getMemberOrder,
})

export { rootReducer }
