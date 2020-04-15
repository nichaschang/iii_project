const express = require('express');
const db = require(__dirname + '/db_connect');
const moment = require('moment-timezone');
const fm = "YYYY-MM-DD";
const fm2 = "YYYYMMDDHHmmss"
const router = express.Router();
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads/' })


// SELECT *  ,(SELECT COUNT(*) FROM `coupon_item` WHERE `cpi_cp_id`=`cp_id`) AS `cp_getedCount` FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE `cp_id` NOT IN (SELECT `cpi_cp_id` FROM `coupon_item` WHERE `cpi_mb_id` = 6)

//會員id
router.post('/',(req,res)=>{

    

    const sqlTotalMember = 'SELECT COUNT(*) AS `cp_total` FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE `cp_id` NOT IN (SELECT `cpi_cp_id` FROM `coupon_item` WHERE `cpi_mb_id` = ?) AND `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE AND `cp_countdown` = 0'

    const sqlTotalNoMember = 'SELECT COUNT(*) AS `cp_total` FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE  `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE AND `cp_countdown` = 0'


    const sqlMember = 'SELECT *   FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE `cp_id` NOT IN (SELECT `cpi_cp_id` FROM `coupon_item` WHERE `cpi_mb_id` = ?) AND `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE AND `cp_countdown` = 0  ORDER BY `cp_created_at` DESC  LIMIT ?,?'

    const sqlNoMember = 'SELECT *  FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE  `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE AND `cp_countdown` = 0  ORDER BY `cp_created_at` DESC  LIMIT ?,?'

    let start = null
    let end = null
    if(req.body.page === 0){
        start = 0
        end = 10
    }else{
        start = req.body.page
        end = 6
    }
    
    if(req.body.mb_id){
        db.queryAsync(sqlTotalMember,[req.body.mb_id])
        .then(r=>{
            const total = r 
            db.queryAsync(sqlMember,[req.body.mb_id,start,end])
            .then(r=>{
                r.forEach(e => {
                    e.cp_start = moment(e.cp_start).format(fm)
                    e.cp_due = moment(e.cp_due).format(fm)
            })
            res.json({total,couponData:r})
              
            });
        })
    }else{
        db.queryAsync(sqlTotalNoMember)
        .then(r=>{
            const total = r 
            db.queryAsync(sqlNoMember,[start,end])
            .then(r=>{
                r.forEach(e => {
                    e.cp_start = moment(e.cp_start).format(fm)
                    e.cp_due = moment(e.cp_due).format(fm)
            })
              res.json({total,couponData:r})
            });
        })
    }

})

router.post('/countdownCoupon',(req,res)=>{
    // console.log('req.body.mb_id',req.body.mb_id)

    const sqlCountdownCoupon = 'SELECT *  FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE  `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE  AND `cp_countdown` = 1  ORDER BY `cp_vendor` ASC '

    let countdownCoupon = null
    let num = null

    if( ( moment().hour() ) % 2 === 0 ){
        num = 0
    }else{
        num = 1
    }
    console.log('num',num)

    db.queryAsync(sqlCountdownCoupon)
    .then(r=>{
        countdownCoupon = r
    

        if(req.body.mb_id){
            const sql = 'SELECT `cpi_cp_id` FROM `coupon_item` WHERE `cpi_mb_id` = ? AND `cpi_cp_id` IN (SELECT `cp_id` FROM `coupon` WHERE `cp_countdown` = 1)'
            db.queryAsync(sql,[req.body.mb_id])
            .then(r=>{
                let arr = []
                if(r.length > 0){
                r.forEach(e=>{
                    arr.push(e.cpi_cp_id)
                })
                countdownCoupon.forEach(e=>{
                    if (arr.indexOf(e.cp_id) > -1 ) {
                        e.geted = true
                    }
                })
                }
                if(num){
                    res.json([countdownCoupon[0],countdownCoupon[1]])
                }else{
                    res.json([countdownCoupon[2],countdownCoupon[3]])
                }
            })

        }else{
            if(num){
                res.json([countdownCoupon[0],countdownCoupon[1]])
            }else{
                res.json([countdownCoupon[2],countdownCoupon[3]])
            }
        }
    })
})

//cp_id 會員id 
router.post('/geted',(req,res)=>{
    // console.log('45456',req.body.mb_id)
    const sqlmbGet = 'INSERT INTO `coupon_item`( `cpi_cp_id`, `cpi_mb_id`, `cpi_use`) VALUES (?,?,0)'
    const sqlcpCount = 'UPDATE `coupon` SET `cp_getedCount`= `cp_getedCount`  + 1 WHERE `cp_id` = ?'
    db.queryAsync(sqlmbGet,[req.body.cp_id,req.body.mb_id])
    .then(r=>{
        db.queryAsync(sqlcpCount,[req.body.cp_id])
        .then(r=>{
            res.json(r)
        })
    })
})

router.post('/memberCoupon',(req,res)=>{
    const sql = 'SELECT * FROM `coupon_item` INNER JOIN `coupon` ON `cpi_cp_id` = `cp_id` INNER JOIN `coupon_rule` ON `cp_rule` = `cpr_id` WHERE `cpi_mb_id` = ? AND `cp_due` >= CURRENT_DATE'
    db.queryAsync(sql,[req.body.mb_id])
    .then(r=>{
        r.forEach(e => {
            e.cp_start = moment(e.cp_start).format(fm)
            e.cp_due = moment(e.cp_due).format(fm)
            e.cpi_useDate = moment(e.cpi_useDate).format(fm)
        });
        res.json(r)
    })
})

router.post('/memberCouponForCart',(req,res)=>{
    const sql = 'SELECT * FROM `coupon_item` INNER JOIN `coupon` ON `cpi_cp_id` = `cp_id` INNER JOIN `coupon_rule` ON `cp_rule` = `cpr_id` WHERE `cpi_mb_id` = ? AND `cp_due` >= CURRENT_DATE AND `cpi_use` = 0'
    db.queryAsync(sql,[req.body.mb_id])
    .then(r=>{
        r.forEach(e => {
            e.cp_start = moment(e.cp_start).format(fm)
            e.cp_due = moment(e.cp_due).format(fm)
            e.cpi_useDate = moment(e.cpi_useDate).format(fm)
        });
        res.json(r)
    })
})


//新增優惠券
// router.post('/addCoupon', upload.single('cp_img'), (req, res) => {
router.post('/addCoupon',upload.single('cp_img'), (req, res) => {

    console.log(req.body)
   
    
    //設定規則

    let rule_num = null
    let discount_num  = null

    switch (req.body.rule){
        case '0':
            rule_num = 0
            break
        case '1':
             rule_num = req.body.rule_pic_num
            break
        case '2':
            rule_num = req.body.rule_cash_num
            break    
    }

    switch (req.body.discount){
        case '0':
            discount_num = req.body.discount_p_num
            break
        case '1':
            discount_num = req.body.discount_cash_num
            break
    }

    

    const sqlForCoupon ='INSERT INTO `coupon` (`cp_vid`,`cp_vendor`,`cp_count`, `cp_start`, `cp_due`, `cp_img`, `cp_rule`) VALUES (?,?,?,?,?,?,?)'

    const arrForCoupon = [89,
                        'TRIPLEC',
                        req.body.count,
                        req.body.start,
                        req.body.due,
                        'ccc.jpg'
                    ]

    const sqlForRule = 'INSERT INTO `coupon_rule`( `cpr_object`, `cpr_rule`, `cpr_ruleNum`, `cpr_discount`, `cpr_discountNum`) VALUES (?,?,?,?,?)'

    const arrForRule = [req.body.object,
                        req.body.rule,
                        rule_num,
                        req.body.discount,
                        discount_num
                    ]


    const output = {
        success: false,
        url: '',
        msg: '沒有上傳檔案',
    };

    db.queryAsync(sqlForRule,arrForRule)
    .then(r=>{
        arrForCoupon.push(r.insertId)
        db.queryAsync(sqlForCoupon,arrForCoupon)
        .then(r=>{
            if(r.affectedRows>0){
                output.success = true;
                res.json(output)
            }else{
                res.json(output)
            }
        })
    })

    // //確認上傳檔案 跟 上傳檔案原始名 是否存在
    // if (req.file && req.file.originalname) {


    //     switch (req.file.mimetype) { //mimetype=>檔案類型
    //         case 'image/jpeg':
    //         case 'image/png':
    //         case 'image/gif':

    //             //設定檔名及副檔名
    //             const extName = req.file.originalname.split('.')
    //             const imgName = moment(new Date()).format(fm2) + '.' + extName[extName.length -1]

    //             arrForCoupon.push(imgName)

    //             //fs裡的rename方法=>搬移檔案 及 更改檔案名
    //             fs.rename(req.file.path, '../public/sty-img/' + imgName, error => {
    //                 //有誤的話
    //                 if (error) {
    //                     output.success = false;
    //                     output.msg = '無法搬動檔案';
    //                 } else {
    //                     //寫進資料庫
    //                     db.queryAsync(sqlForRule,arrForRule)
    //                     .then(r=>{
    //                         arrForCoupon.push(r.insertId)
    //                         db.queryAsync(sqlForCoupon,arrForCoupon)
    //                         .then(r=>{
    //                             if(r.affectedRows>0){
    //                                 output.success = true;
    //                             }
    //                         })
    //                     })
    //                 }
    //                 res.json(output);
    //             });
    //             break;
    //         default:
    //             //fs.unlink => 刪除暫存的圖片
    //             fs.unlink(req.file.path, error => {
    //                 output.msg = '不接受式這種檔案格';
    //                 res.json(output);
    //             });
    //     }
    // } else {
    //     res.json(output);
    // }
})


//廣告
router.get('/adData',(req,res)=>{

    const sqlForAd = 'SELECT * FROM `plan` INNER JOIN `ad` ON `plan`.`planId` = `ad`.`adPlanId` INNER JOIN `promotion_group` ON `plan`.`planId` = `promotion_group`.`groupPlanId` WHERE `planStatus` = "上架" '
    db.queryAsync(sqlForAd)
    .then(r=>{
        res.json(r)
    })
})


//會員收藏
router.post('/mbLike',(req,res)=>{
    console.log('8888888888',req.body.mb_id)
    const sql = 'SELECT `collect_id`,`itemId`,`name`,`itemName`,`itemImg`,`itemPrice`,`itemCategoryId`,`mb_id` FROM `member_collect` INNER JOIN `items` ON `items`.`itemId` = `member_collect`.`p_id` WHERE `mb_id` = ? '
    db.queryAsync(sql,[req.body.mb_id])
    .then(r=>{
        res.json(r)
    })
})

//新增會員收藏
router.post('/addMbLike',(req,res)=>{
    console.log(req.body.obj.name)
    const sql = 'INSERT INTO `member_collect` ( `mb_id`, `p_id`, `p_category`, `p_vendor`) VALUES (?,?,?,?) '
    const arr = [req.body.mb_id,
                req.body.obj.itemId,
                req.body.obj.itemCategoryId,
                req.body.obj.name,]
    db.queryAsync(sql,arr)
    .then(r=>{
        res.json(r)
    })
})

//刪除會員收藏
router.post('/delMbLike',(req,res)=>{
    const sql = 'DELETE FROM `member_collect` WHERE `mb_id` = ? AND `p_id` = ?'
    db.queryAsync(sql,[req.body.mb_id,req.body.obj.itemId])
    .then(r=>{
        res.json(r)
    })
})

//後臺資料
router.get('/backCouponData',(req,res)=>{

    const sql = 'SELECT *  FROM `coupon` INNER JOIN `coupon_rule` ON `coupon`.`cp_rule` = `coupon_rule`.`cpr_id` WHERE  `cp_start` <= CURRENT_DATE  AND `cp_due` >= CURRENT_DATE AND `cp_countdown` = 0  ORDER BY `cp_created_at` DESC '

    db.queryAsync(sql)
    .then(r=>{
        res.json(r)
    })
})

router.get('/backAdData',(req,res)=>{

    const sql = 'SELECT * FROM `plan` INNER JOIN `ad` ON `plan`.`planId` = `ad`.`adPlanId` INNER JOIN `promotion_group` ON `plan`.`planId` = `promotion_group`.`groupPlanId` ORDER BY `planId` ASC '
    db.queryAsync(sql)
    .then(r=>{
        res.json(r)
    })
})


router.post('/backAdSetState',(req,res)=>{

    const sql = 'UPDATE `plan` SET `planStatus` = ? WHERE `planId` = ?'
    db.queryAsync(sql,[req.body.planStatus,req.body.planId])
    .then(r=>{
        res.json(r)
    })
})


// INSERT INTO `coupon`( `cp_vid`, `cp_vendor`, `cp_count` ,`cp_img`, `cp_start`, `cp_due`) VALUES 
// (73,'AFAMIC 艾法',100,'AFAMIC 艾法.jpg',2020-03-11,2020-04-2),
// (79,'GOLiFE',130,'GOLiFE.png',2020-03-09,2020-04-20),
// (81,'HTR',120,'HTR.jpg',2020-03-19,2020-04-10),
// (82,'JLab',80,'JLab.jpg',2020-03-15,2020-04-10),
// (83,'Plantronics繽特力',100,'Plantronics繽特力.jpg',2020-03-19,2020-04-30),
// (85,'Holy Stone',100,'Holy Stone.png',2020-03-19,2020-04-10),
// (86,'JOBY ',150,'JOBY.jpg',2020-03-19,2020-04-10),
// (87,'Jenova 吉尼佛',100,'Jenova 吉尼佛.jpg',2020-03-15,2020-04-10),
// (88,'Incase',100,'Incase.jpg',2020-03-19,2020-04-10)

// INSERT INTO `coupon_rule`( `cpr_object`, `cpr_rule`, `cpr_ruleNum`, `cpr_discount`, `cpr_discountNum`) VALUES 
// (1,2,15000,0,90),
// (1,0,0,1,3000),
// (4,1,3,0,86),
// (2,1,2,1,5000),
// (2,0,0,0,77),
// (3,2,20000,1,4000),
// (4,1,3,1,3000),
// (4,0,0,0,95),
// (4,2,10000,1,3500),


module.exports = router