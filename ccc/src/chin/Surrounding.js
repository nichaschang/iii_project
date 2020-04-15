import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
//scss
import './chin-css/items.scss'
import '../css/main.scss'
//components
import Commoditycomponents2 from './components/Commoditycomponents2'
import Commoditycomponents from './components/Commoditycomponents'
import Commoditylist from './components/Commoditylist'
import CompareProductSort from './components/CompareProductSort'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { formServerItemsData, ResetListItemName } from './actions/itemsActions'

import {fromServerMbLikeData} from '../stacey/actions/couponAction'


function Surrounding(props) {
  const [englishnameSurrounding, setEnglishnameSurrounding] = useState(
    'SURROUNDING'
  )

  const [commodityPrice, setCommdityPrice] = useState(false)
  //會員id
  const mb_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0





  useEffect(() => {
    props.formServerItemsData('surrounding')
    if(mb_id) {
      props.fromServerMbLikeData(mb_id)
    }
    return ()=> props.ResetListItemName()
  }, [])


  const [commodity, setCommdity] = useState(false)
  const itemlist = props.data.map((val, ind) => {
    let mbLike = false
    if(props.mbLikeData.findIndex((v)=>v.itemId === val.itemId) > -1 ){
      mbLike = true
    }
    if (props.surrounding.indexOf(val.name) > -1) {
      return <Commoditycomponents key={val.itemId} data={val} arrIndex={ind} mbLike={mbLike}/>
    }
  })
  const allitemlist = props.data.map((val, ind) => {
    let mbLike = false
    if(props.mbLikeData.findIndex((v)=>v.itemId === val.itemId) > -1 ){
      mbLike = true
    }
    return <Commoditycomponents key={val.itemId} data={val} arrIndex={ind} mbLike={mbLike}/>
  })
  const commodityItems = props.data.map((val, ind) => {
    if (props.surrounding.indexOf(val.name) > -1) {
      return <Commoditycomponents2 key={val.itemId} data={val} arrIndex={ind} />
    }
  })
  const allcommodityItems = props.data.map((val, ind) => {
    return <Commoditycomponents2 key={val.itemId} data={val} arrIndex={ind} />
  })
  const ItemPrice = props.data.map((val,ind)=>{
    if(props.ItemPrice.itemPrice < val.itemPrice || props.ItemPrice2.itemPrice2 > val.itemPrice){
        // console.log(val)
      return <Commoditycomponents key={val.itemId} data={val} arrIndex={ind} />
    }
  })

  return (
    <>
      <main className="chin-main">
        <section className="chin-section">
          <Commoditylist data={props.data} price={commodityPrice}  sendprice={v => {
                setCommdityPrice(v)
              }}/>
          <div className="chin-commodity-title">
            <CompareProductSort
              data={props.data}
              englishname={englishnameSurrounding}
              test={commodity}
              sendText={text => {
                setCommdity(text)
              }}
            />
            <div className="chin-commodity">
            {commodityPrice?ItemPrice:commodity
                  ? 
                  props.surrounding.length
                  ? commodityItems
                  : allcommodityItems
                  : 
                  props.surrounding.length
                  ? itemlist
                  : allitemlist}
              {/* {commodity
                ? props.surrounding.length
                  ? commodityItems
                  : allcommodityItems
                :  props.surrounding.length
                ? itemlist
                : allitemlist} */}
            </div>
            <div className="circle">
              <div className="circle1">
                <div className="circle3"></div>
                <div className="circle3"></div>
                <div className="circle3"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// 選擇對應的reducer
const mapStateToProps = store => {
  return { data: store.getItems, 
          surrounding: store.getListitemName,
          ItemPrice: store.getListitemPrice,
          ItemPrice2:store.getListitemPrice2,
          mbLikeData:store.memberLikeData,
          rest:store.rest}
}

//action
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      formServerItemsData,
      ResetListItemName,
      fromServerMbLikeData,
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Surrounding)
)
