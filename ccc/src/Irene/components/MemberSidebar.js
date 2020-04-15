import React, { useEffect, useState } from 'react'
import '../I_css/MemberEdit.scss'
import { Form, ListGroup, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import MemberOrder from '../MemberOrder'
import $ from 'jquery'

import {
  FiChevronDown
} from 'react-icons/fi'

function MemberSidebar(props) {
  const memberdata = localStorage.getItem('userdata')
  const account = JSON.parse(memberdata)
  const usernametrue = account.username
  const imgid=localStorage.getItem('userId')
  console.log('imgid',imgid)
  // console.log('memberdata.username', account)
  // console.log('username', usernametrue)
  function openNav() {
    // alert('ya')
    document.querySelector('.irene-side-nav').style.width = '250px'
  }
  function closeNav() {
    document.querySelector('.irene-side-nav').style.width = '0'
  }

  const [storyListOpen, setStoryListOpen] = useState(false)
  const toggleStories = () => {
    setStoryListOpen(!storyListOpen)
  }
  return (
    <>
      {/* 要加<div className="row d-flex justify-content-center">才可以flex */}
      {/* <MemberSidebar/> */}
      <div className="membersidebar col-3">
        <ListGroup>
          <ListGroup.Item>         
            <div className='editPic'>
              <div className='userPic'>
               <img className="image" src={require(`../irene-img/${imgid}.png`)} alt="Background" />
              </div>
              <Nav.Link className="edit">編輯</Nav.Link>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Link href={'/memberedit/' + usernametrue}>
              基本資料管理
            </Nav.Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Link href={'/memberedit/memberorder/' + usernametrue}>
              交易紀錄
            </Nav.Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Link href="/memberedit/ShopCartLike">我的收藏</Nav.Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Link href="/memberedit/memberCoupon">優惠券</Nav.Link>
          </ListGroup.Item>
          <ListGroup.Item className='bk-member-nav-story-group'>
            <div 
            className={`bk-member-nav-button nav-link ${storyListOpen ? 'active' : ''}`}
            onClick={toggleStories} 
            role="button"
            >
              我的故事 <FiChevronDown />
            </div>
            <div
              className={`bk-member-nav-stories-list${
                storyListOpen ? ' active' : ''
              }`}
            >
              <Nav.Link href="/member/upload-stories">寫故事</Nav.Link>
              <Nav.Link href="/member/stories">已發布故事</Nav.Link>
              <Nav.Link href="/member/stories/drafts">草稿</Nav.Link>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="irene-openRWDbtn">
        <button
          className="irene-openside-btn"
          onClick={event => openNav(event)}
        >
          side
        </button>
      </div>
      <div className="irene-RWD-membersidebar irene-side-nav">
        <Nav className="flex-column">
          <Nav.Link>
            <button
              className="irene-closeside-btn"
              style={{ textAlign: 'left' }}
              onClick={event => closeNav(event)}
            >
              X
            </button>
          </Nav.Link>
          <div className="irene-image-div">
            <img className="image" src="https://fakeimg.pl/150x150/" alt="" />
          </div>
          <Nav.Link>基本資料管理</Nav.Link>
          <Nav.Link>交易紀錄</Nav.Link>
          <Nav.Link>我的收藏</Nav.Link>
          <Nav.Link>優惠券</Nav.Link>
          <Nav.Link>
            <div onClick={toggleStories} role="button">
              我的故事 <FiChevronDown />
            </div>
            <div
              className={`bk-member-nav-stories-list${
                storyListOpen ? ' active' : ''
              }`}
            >
              <Nav.Link href="/member/upload-stories">寫故事</Nav.Link>
              <Nav.Link href="/member/stories">已發布故事</Nav.Link>
              <Nav.Link href="/member/stories/drafts">草稿</Nav.Link>
            </div>
          </Nav.Link>
        </Nav>
      </div>
    </>
  )
}

export default MemberSidebar
