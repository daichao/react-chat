const mongoose = require('mongoose');
//链接mongo,并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})

const models={
    user:{
        'user':{type:String,required:true},
        'pwd':{type:String,required:true},
        'type':{type:String,required:true},
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},
        'company':{type:String},
        'money':{type:String}
    },
    chat:{}
}

for(let m in models){
    console.log('--------');
    console.log(models[m]);
    console.log('--------');
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
    getModel:function (name) {
        return mongoose.model(name);
    }
}
// const User = mongoose.model('user', new mongoose.Schema({
//     user: {type: String, require: true},
//     age: {type: String, require: true}
// }))

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