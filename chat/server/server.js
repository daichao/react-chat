const express = require('express');
const mongoose = require('mongoose');
//链接mongo,并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: String, require: true}
}))

//新增
// User.create({
//     user:'daichao',
//     age:18
// },function (err,doc) {
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//
//     }
// })

//删除
// User.remove({age:18},function (err,doc) {
//     console.log(doc);
// })

//更新
// User.update({'user':'daichao'},{'$set':{age:26}},function (err,doc) {
//     console.log(doc);
// })
//新建app
const app = express()


app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>')
})

app.get('/data', function (req, res) {
    // User.find({user:'daichao'},function (err,doc) {
    //     res.json(doc)
    // })
    User.findOne({user:'daichao'},function (err,doc) {
        res.json(doc);
    })
    // res.json({name: 'daichao', type: 'Web'})
})


app.listen(9093, function () {
    console.log('Node app start at port 9093')
})