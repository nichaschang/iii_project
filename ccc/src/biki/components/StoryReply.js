import React, {useState, useRef, useEffect} from 'react'
// import useReplyTextarea from '../utils/useReplyTextarea'
import useTextareaRows from '../utils/useTextareaRows'

function StoryReply(props){

    const [txtContent, setTxtContent] = useState('')
    const [showReplyTo, setShowReplyTo] = useState(false)
    const [replyTo, setReplyTo] = useState(null)
    const user = localStorage.getItem('userId')
    // const [user, setUser] = useState(localStorage.getItem('userId'))

    const {
        rows, 
        handleRows, 
        handleKey
    } = useTextareaRows()

    useEffect(()=>{
        if(props.openRplyTo !== props.id){
            setShowReplyTo(false)
            if(user){
                setTxtContent('')
            }
        }
    }, [props.openRplyTo])

    const handleChange = (data, evt)=>{
        setTxtContent(evt.target.value)
        setReplyTo(data)
    }

    const handleToggleShow = (id)=>{
        if(showReplyTo && user){
            setTxtContent('')
        }else{
            setReplyTo(id)
        }
        setShowReplyTo(!showReplyTo)
    }

    const rplyRef = useRef(null)

    return (
        <div className="bk-story-replies" id={props.id} ref={rplyRef}>
            {props.data.rplyToName ? (
                <div className='bk-txt-small rply-to'>
                {`回覆給 ${props.data.rplyToName}`}
            </div>
            ) : ''}
            
            <div className='bk-rply-head'>
                <div className='bk-rply-user-img'>
                    <img src={props.data.Img ? props.data.Img : '/biki-img/SVG/user.svg'} />
                </div>
                <div>
                    {props.data.Name || props.data.Account} <br />
                    {props.data.fromNow}
                </div>
            </div>
            <div className="bk-rply-body">
                <div>{props.data.rplyContent}</div>
            </div>
            <div className="bk-rply-foot">
                <div onClick={()=>{
                    handleToggleShow(props.id)
                    props.onClick(props.id)
                    }} 
                    role="button"
                    className='bk-hover'
                >
                    {showReplyTo ? '取消' : '回覆'}
                </div>
            </div>
            <div className={`bk-reply-textarea${!showReplyTo ? ' hidden' : ''}`}>
                <textarea 
                    rows={rows}
                    value={user ? txtContent : '請先登入才能回復'} 
                    onChange={(evt)=>{
                        handleRows(evt);
                        handleChange(props.data.rplyId, evt);
                    }} 
                    onKeyDown={handleKey}
                    disabled={user ? false : true}
                ></textarea>
                <div className='bk-reply-btn-group'>
                    <button 
                    onClick={handleToggleShow} 
                    className={`${user ? 'bk-btn-black-bordered' : 'bk-btn-grey-bordered'} bk-hover`}
                    disabled={user ? false : true}
                    >取消</button>
                    <button 
                    onClick={()=>{
                        props.handlers.submit(replyTo, txtContent)
                    }}
                    className={`${user ? '' : 'bk-btn-grey'} bk-hover`}
                    disabled={user ? false : true}
                    >回覆</button>
                </div>
            </div>
        </div>
    )
}

export default StoryReply