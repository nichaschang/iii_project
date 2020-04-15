const express = require('express');
const db = require(__dirname + '/db_connect');
const router = express.Router();



router.get('/allitems', (req, res)=>{
    let sql='SELECT * FROM `items` ORDER BY RAND() LIMIT 24'
    db.queryAsync(sql)
    .then(r=>{
        return res.json(r)
    })
})

router.get('/watch', (req, res)=>{
    let sql='SELECT * FROM `items` WHERE `itemCategoryId`="穿戴式裝置"'
    db.queryAsync(sql)
    .then(r=>{
        return res.json(r)
    })
})
router.get('/headset', (req, res)=>{
    let sql='SELECT * FROM `items` WHERE `itemCategoryId`="耳機/喇叭"'
    db.queryAsync(sql)
    .then(r=>{
        return res.json(r)
    })
})
router.get('/actioncamera', (req, res)=>{
    let sql='SELECT * FROM `items` WHERE `itemCategoryId`="運動攝影機"'
    db.queryAsync(sql)
    .then(r=>{
        return res.json(r)
    })
})
router.get('/surrounding', (req, res)=>{
    let sql='SELECT * FROM `items` WHERE `itemCategoryId`="周邊"'
    db.queryAsync(sql)
    .then(r=>{
        return res.json(r)
    })
})
router.get('/commidty/:itemId?',(req,res)=>{
    // res.json(req.params);
    let sql='SELECT * FROM `items` WHERE `itemId` = ?'
    db.queryAsync(sql,[req.params.itemId])
    .then(r=>{
        return res.json(r)
    })
})
router.get('/multiple_images/:itemId?',(req,res)=>{
    let sql='SELECT * FROM `multiple_images` WHERE `itemId` = ? ORDER BY `multipleImageId` ASC'
    db.queryAsync(sql,[req.params.itemId])
    .then(r=>{
        return res.json(r)
    })
 })
router.get('/itemhis/:name?',(req,res)=>{
    let sql='SELECT * FROM `items` WHERE `name` = ?'
    db.queryAsync(sql,[req.params.name])
    .then(r=>{
        return res.json(r)
    })
})
router.get('/itemCategoryId/:itemCategoryId?/:headphone?',(req,res)=>{
    let sql='SELECT * FROM `items` WHERE `itemCategoryId` = ?'
    let newParms = req.params.itemCategoryId
    if(req.params.headphone !== undefined){
        newParms = newParms +  '/' + req.params.headphone
    }
    console.log('req.params',req.params)
    db.queryAsync(sql,[newParms])
    .then(r=>{
        return res.json(r)
    })
})
router.get('/users/:itemId?',(req,res)=>{
    let sql='SELECT * FROM `useritem` WHERE `productId` = ?'
    db.queryAsync(sql,[req.params.itemId])
    .then(r=>{
        return res.json(r)
    })
})
module.exports = router;