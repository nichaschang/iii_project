import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    AddCart,
    getShopCart,
    AddCartItem,
    DelCartItem,
    CalShopCart,
    Handle_AddMyFavorite,AddCartNewItem_sendcal} from '../../mao/actions/ShopCartAction'

import {addMbLikeData,delMbLikeData} from '../../stacey/actions/couponAction'


import { FiHeart ,FiShoppingBag} from 'react-icons/fi'
import Swal from 'sweetalert2'
function Commoditycomponents(props){
// console.log(props)
const [forMyfavor,setForMyfavor]=useState(false)

// if(props.mbLike){
//   setForMyfavor(true)
// }


//會員
const mb_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0

const [alertType,setAlertType]=useState('')
const checkAlertType=showTpye=>{
  switch(showTpye){
      case '加入購物車':
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: '已加入購物車',
              showConfirmButton: false,
              timer: 1000
            })
            break
      case '加入我的最愛':
          Swal.fire({
              position: 'center',
              icon:'success',
              title: '已加入我的最愛',
              showConfirmButton: false,
              timer: 1000
            })
            break
            case '已取消我的最愛':
                Swal.fire({
                    position: 'center',
                    icon:'error',
                    title: '已取消我的最愛',
                    showConfirmButton: false,
                    timer: 1000
                  })
                  break
      default:
          break                
  }
}
//ItemlocalStorage
const [newHisitem,setNewHisitem]=useState([])
async function ItemToLocalStorage(value) {

  const currentHisitem = JSON.parse(localStorage.getItem('hisitem')) || []
  if(currentHisitem.length===0){
    const newHisitem = [...currentHisitem, value]
    localStorage.setItem('hisitem', JSON.stringify(newHisitem))
  }

  let box=[]
  currentHisitem.map((val,ind)=>{
    box.push(val.itemId)
  })
    let index = box.findIndex(e=>e==value.itemId)
    if(index === -1){
      const newHisitem = [...currentHisitem, value]
      localStorage.setItem('hisitem', JSON.stringify(newHisitem))
    }
  // 設定資料
  setNewHisitem(newHisitem)
}
    return(
        <>
              <div key={props.data.itemName} className="chin-commodity-item">
                    <ul className="chin-star-heart-bag">
                        <li><img className="chin-star" src="/chin-img/star.svg" alt=""/></li>
                        <li><img className="chin-star" src="/chin-img/star.svg" alt=""/></li>
                        <li><img className="chin-star" src="/chin-img/star.svg" alt=""/></li>
                        <li><img className="chin-star" src="/chin-img/star.svg" alt=""/></li>
                        <li><img className="chin-star" src="/chin-img/star.svg" alt=""/></li>
                        <li className="chin-heart-bag">
                        
                        <FiHeart className={`chin-heart ${forMyfavor?'Mao-like-red':''}`}  
                        onClick={()=>{
                          if(mb_id){
                              props.mbLike ? props.delMbLikeData(mb_id,props.data) : props.addMbLikeData(mb_id,props.data) 
                              setForMyfavor(true)
                            let info=!props.mbLike?"加入我的最愛":"已取消我的最愛"
                            checkAlertType(info)
                            }else{
                              alert('請先登入')
                            }
                          }
                                }/>
                            <FiShoppingBag  className="chin-bag"  onClick={()=>{
                              props.AddCartNewItem_sendcal(props.data,props.AddItem)
                              props.sendFunc(!props.forChange)
                              checkAlertType("加入購物車")
                            }}
                            />
                        </li>
                    </ul>
                    <Link to={'/commidty/'+props.data.itemId} onClick={()=>{ItemToLocalStorage(props.data)}}>
                      <img className="chin-watchs" src={`/chin-img/images/${props.data.itemName}/${props.data.itemImg}`} alt=""/>
                      <h6>{props.data.name}</h6>
                      <h4>{props.data.itemName}</h4>
                      <h5>NT{props.data.itemPrice}</h5>
                      
                    </Link>
            </div>
          
        </>
    )
}


// 告訴redux該怎麼對應它的store中的state到這個元件的props的哪裡
const mapStateToProps = store => {
    return {
      AddItem: store.AddItem,
      MyFavorite: store.MyFavorite,
      CtrlData: store.ControlDataState,
    }
  }
  
  //action
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        AddCart,
        getShopCart,
        AddCartItem,
        DelCartItem,
        CalShopCart,
        Handle_AddMyFavorite,
        AddCartNewItem_sendcal,
        addMbLikeData,delMbLikeData
      },
      dispatch
    )
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Commoditycomponents)
  

// export default Commoditycomponents