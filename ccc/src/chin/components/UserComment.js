import React,{useState,useEffect, useReducer} from 'react'
//classnames
import classNames from 'classnames'
import Swal from 'sweetalert2'
import {
  IoIosStarOutline,
  IoIosStar,
} from 'react-icons/io'
import {BrowserRouter as Router,Route,Link,Switch,withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//action
import {bindActionCreators} from 'redux'
import {formServerUsersData} from '../actions/itemsActions'

function UserComment(props){

  const [postacomment,setPostacomment]=useState(false)
  const [start,setStart] = useState([])
const PostacommentClassName= classNames('chin-usercomment-fractionalstars',{active:postacomment})
const itemId = props.match.params.itemId ? props.match.params.itemId : ''

let bigbox=[]
let starbox=[]
let starItem=(
  <IoIosStar style={{width:'20px',height:'20px',color:'#FFDD00'}}/>
)
let starItem2=(
  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
)
const Rank = props.UserData.map((v,i)=>{
  for(let i=0;i<v.rank;i++) {
    starbox.push(starItem)
  }
  for(let k=v.rank;k<5;k++){
    starbox.push(starItem2)
  }
  bigbox.push(starbox)
  starbox=[]
 })
 const pioaks = ()=>
 Swal.fire({
  icon: 'error',
  title: '請購買此產品才能進行發表評論!!',
})

useEffect(()=>{
  props.formServerUsersData(itemId)
  },[])


    return(
        <>
        <div className={PostacommentClassName}>
        <h3>用戶評論</h3>
        <div className="chin-usercomment">
          <div className="chin-fractionalstars">
            <div className="chin-fractional">
              <p>5.0</p>
              <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              <p>{props.UserData.length}則評論</p>
            </div>
            <div className="chin-commentstars">
              <div>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
              </div>
              <div>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
              </div>
              <div>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
              </div>
              <div>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
              </div>
              <div>
                <IoIosStar style={{width:'25px',height:'25px',color:'#FFDD00'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
                <IoIosStarOutline style={{width:'25px',height:'25px'}}/>
              </div>
            </div>
          </div>
          <div className="chin-sort-discuss">
            <div className="chin-discuss">
              <button onClick={()=>{pioaks()}}>發表評論</button>
            </div>
          </div>
        </div>
        <div className="chin-discusspost">
            <h3>發表評論</h3>
            <div className="chin-disclopsaa">
              <div>
                <p>評分</p>
                <div className="chin-startsuser">
                  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
                  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
                  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
                  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
                  <IoIosStarOutline style={{width:'20px',height:'20px'}}/>
                </div>
              </div>
              <div>
                <p>標題</p>
                <input type="text" />
              </div>
              <div>
                <p>內容</p>
                <textarea type="text" />
              </div>
            </div>
            <div className="chin-loopkpi">
              <button>取消</button>
              <button>發表評論</button>
            </div>
        </div>
        <div className="chin-sortspan">
            {/* <button>
              <span>排序</span>
              <img src="/chin-img/chevron-down-black.svg" alt="" />
            </button> */}
        </div>
      </div>
      {props.UserData.map((val,ind)=>{
        return(
      <div className="chin-avatar-name-p">
        <div className="chin-avatar-name">
          <div className="chin-avatar">
            <img src={`/chin-img/${val.img}`} alt="" />
          </div>
          <div>
          {bigbox[ind]}
            <h6>{val.userName}</h6>
            <span>1個月前</span>
          </div>
          <div className="chin-rwd-avatar-circle-circle">
            <span className="chin-rwd-avatar-circle"></span>
            <span className="chin-rwd-avatar-circle"></span>
            <span className="chin-rwd-avatar-circle"></span>
          </div>
        </div>
        <div>
          <h1>{val.commentText2}</h1>
          <p>
          {val.commentText}
          </p>
          <div className="chin-reply">
            <a href="">回復</a>
            <a href="">有幫助</a>
            <a href="">檢舉</a>
          </div>
        </div>
      </div>
      )
    })}
      </>
    )
}

// 選擇對應的reducer
const mapStateToProps = store => {
  return { UserData:store.getUsersData,
         }
}

//action
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      formServerUsersData,
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserComment)
)