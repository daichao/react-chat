const express = require("express");
const utils = require("utility");
const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const _filter = { __v: 0, pwd: 0 };

Router.get("/list", (req, res) => {
  const { type } = req.query;

  User.find({ type }, (err, doc) => {
    if (!err) {
      return res.json({ code: 0, data: doc });
    } else {
      return res.json(err);
    }
  });
});

Router.get("/getmsglist", function(req, res) {
  const user = req.cookies.userid;
  User.find({}, function(err, userdoc) {
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    Chat.find({'$or':[{from:user},{to:user}]}, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, msgs: doc,users:users });
      }
    })
  });
  // {'$or':[{from:user,to:user}]}
  
});

Router.post("/login", (req, res) => {
  const { user, pwd } = req.body;
  //第一个参数是查询条件，第二个参数是显示
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误！" });
    }
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc });
  });
});
Router.post("/register", (req, res) => {
  console.log(req.body);
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (e, d) => {
    if (d) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = d;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.post("/readmsg",function(req,res){
  const userid=req.cookies.userid;
  const {from}=req.body;
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},
    function(err,doc){
    if(!err){
      return res.json({code:0,num:doc.nModified})
    }return res.json({code:1,msg:'修改失败'})
  })

})

Router.post("/update", (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});
Router.get("/info", (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: "后端出错" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

function md5Pwd(pwd) {
  const salt = "imooc_is_good_19890121+DaiChao!";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
