import axios from "axios";
import {getRegisterPath} from '../util'
// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
// const LOGIN_SUCCESS="LOGIN_SUCCESS";
const AUTH_SUCCESS="AUTH_SUCCESS"
const LOAD_DATA="LOAD_DATA";
const LOGOUT="LOGOUT"
const initState = {
  redirectTo:"",
  // isAuth: false,
  msg: "",
  user: "",
  // pwd: "",
  type: ""
};
//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: "", redirectTo:getRegisterPath(action.payload), ...action.payload};
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    case LOAD_DATA:
      return {...state,...action.payload}
    case LOGOUT:
      return {...initState,redirectTo:'/login'}
      default:
      return state;
  }
}
function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}
function authSuccess(obj) {
  const {pwd,...data}=obj;
  return { type: AUTH_SUCCESS, payload: data };
}

export function loadData(userInfo){
  return {type:LOAD_DATA,payload:userInfo};
  
}
export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd) {
    return errorMsg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不一致");
  }
  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('必须输入用户名和密码！')
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function update(data){
  return dispatch=>{
    axios.post('/user/update',data)
    .then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}

export function logoutSubmit(){
  return {type:LOGOUT}
}