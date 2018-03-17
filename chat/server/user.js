const express = require("express");
const utils = require("utility");
const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
const _filter={'__v':0,'pwd':0};
Router.get("/list", (req, res) => {
  // User.remove({},(e,d)=>{

  // })
  const {type}=req.query;

  User.find({type}, (err, doc) => {
    if (!err) {
      return res.json({code:0,data:doc});
    } else {
      return res.json(err);
    }
  });
});
Router.post("/login",(req,res)=>{
  const {user,pwd}=req.body;
  //第一个参数是查询条件，第二个参数是显示
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>{
    if(!doc){
        return res.json({code:1,msg:'用户名或密码错误！'})
    }
    res.cookie("userid",doc._id);
    return res.json({code:0,data:doc})
  })
})
Router.post("/register", (req, res) => {
  console.log(req.body);
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (e, d) => {
    if (d) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    const userModel=new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function(e,d){
      if(e){
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const {user,type,_id}=d;
      res.cookie('userid',_id);
      return res.json({ code: 0 ,data:{user,type,_id}});
    })
    
  });
});

Router.post("/update",(req,res)=>{
  const userid=req.cookies.userid;
if(!userid){
return res.json({code:1})

}
const body=req.body;
User.findByIdAndUpdate(userid,body,(err,doc)=>{
  const data=Object.assign({},
  {
    user:doc.user,
    type:doc.type
  },body);
  return res.json({code:0,data})
})
})
Router.get("/info", (req, res) => {
  const {userid}=req.cookies;
  if(!userid){
    return res.json({ code: 1 });
  }
  User.findOne({_id:userid},_filter,(err,doc)=>{
    if(err){
      return res.json({ code: 1 ,msg:"后端出错"});
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
  
});

function md5Pwd(pwd){
  const salt='imooc_is_good_19890121+DaiChao!'
  return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;
