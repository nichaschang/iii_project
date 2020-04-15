import React ,{useState} from 'react'

//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {addFilterCoupon} from '../actions/couponAction'


import {
  FiChevronDown
} from 'react-icons/fi'


function CouponSideFilter (props){


  const filter = function (e){
      props.addFilterCoupon({isChecked:e.target.checked,vendorName:e.target.value},props.filterList)
  }
  
    return(
        <>
        <div className="col-3 sty-sideFilter">
          <div className="sty-title">
            <h3>品牌</h3>
            <FiChevronDown />
          </div>
          <hr />
          <ul onChange={(e)=>filter(e)}>
          {props.list.map((val,ind)=>{
            return (<li key={ind}>
              <input type="checkbox" name={val} id={val} value={val}/>
              <label htmlFor={val}>
              <div className="sty-box"></div>
              {val}
                </label>
            </li>)
          })}
          </ul>
        </div>
        </>
    )
}


// 選擇對應的reducer
const mapStateToProps = store => {
  return {  filterList: store.filterCoupon,}
}

//action
const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    addFilterCoupon
  },dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(CouponSideFilter)