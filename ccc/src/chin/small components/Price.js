/*-----------------------Commoditylist.js的價格--------------------------*/
import React,{useState,useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import ValueLabel from "@material-ui/core/Slider/ValueLabel";
import Typography from '@material-ui/core/Typography';
//classnames
import classNames from 'classnames'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {ListItemPrice,ListItemPrice2} from '../actions/itemsActions'

function Price(props){
  console.log(props)
    const [volume, setVolume] = useState([0,40000]);
    const [value,setValue]=useState([20,37])
    const [price,setPrice] = useState(false)
    
    const PriceClassName= classNames('chin-totalprice',{active:price})
    const handleSliderChange = (event, value) => {
        setVolume(value);
      };
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const StyledValueLabel = withStyles({
        offset: {
          top: -36,
          left: props => props.index === 0 ? "calc(-250%)" : "calc(-20%)"
        },
        circle: {
            width:38,
            height:38,
          transform: props => props.index === 0 ? "rotate(-90deg)" : "rotate(0deg)"
        },
        label: {
          transform: props => props.index === 0 ? "rotate(90deg)" : "rotate(0deg)"
        }
      })(ValueLabel);
    
    
    const useStyles = makeStyles(theme => ({
        root: {
          width: 170 + theme.spacing(3) * 2,
          marginLeft:35,
        },
        margin: {
          height: theme.spacing(3),
        },
      }));
      
      const AirbnbSlider = withStyles({
        root: {
          color: '#3a8589',
          height: 3,
          padding: '13px 0',
        },
        thumb: {
          height: 25,
          width: 25,
          backgroundColor: '#fff',
          border: '7px solid #0ac3ae',
          marginTop: -12,
          marginLeft: -13,
          boxShadow: '#ebebeb 0px 2px 2px',
          '&:focus,&:hover,&$active': {
            boxShadow: '#ccc 0px 2px 3px 1px',
          },
          '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
          },
        },
        active: {},
        // valueLabel: {
        //   left: props =>
        //   props.index === 0 ? "calc(-50% - 4px)" : "calc(-50% - 4px)",
        // },
        track: {
          height: 3,
          backgroundColor:'#0ac3ae',
      
        },
        rail: {
          color: '#a0a0a0',
          opacity: 1,
          height: 3,
        },
        value:{
      
        }
      })(Slider);
      function valuetext(value) {
        return `${value}°C`;
      }

      function CustomizedSlider() {
        const classes = useStyles();
        
        return (
          <div className={classes.root}>
          <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography>
          <Slider
            value={value}
            ValueLabelComponent={StyledValueLabel}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
          // <div className={classes.root}>
          //   <div className={classes.margin} />
          //   <AirbnbSlider
          //   ValueLabelComponent={StyledValueLabel}
          //    valueLabelDisplay="auto"
          //     getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}
          //     defaultValue={[10000, 40000]}
          //     min={10000}
          //     max={40000}
          //     // value={volume}
          //     // onChange={handleSliderChange}
          //   />
          // </div>
        );
      }
      const Itemprice = function (e){
        props.ListItemPrice({itemPrice:e.target.value})
      }
      const Itemprice2 = function (e){
        props.ListItemPrice2({itemPrice2:e.target.value})
      }
    return(
        <>
            <li className={PriceClassName} onClick={()=>{props.sendprice(!props.price)}}>
                <div className="chin-price" onClick={()=>{setPrice(!price)}}>
                    <span>價格</span>
                    <img src="./chin-img/chevron-down-black.svg" alt=""/>
                </div>
                <div className="chin-slide">
                    <div className="chin-price-input">
                        <input type="text"  onBlur={(e)=>Itemprice(e)}/>
                        <input type="text" onBlur={(e)=>Itemprice2(e)}/>
                    </div>
                    {/* {CustomizedSlider()} */}
                </div>
            </li>
        </>
    )
}

// 選擇對應的reducer
const mapStateToProps = store => {
  return {ItemPrice: store.getListitemPrice,
          ItemPrice2:store.getListitemPrice2}
}

//action
const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    ListItemPrice,
    ListItemPrice2
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Price)
