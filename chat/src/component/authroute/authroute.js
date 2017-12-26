import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
    componentDidMount() {

        const publicList=['/login','/register'];
        const pathname=this.props.history.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }

        //获取用户信息
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if(res.data.code===0){

                }else{
                    this.props.history.push('/login')
                }
                console.log(res.data)
            }
        })
        //是否登录 现在的url地址 login不需要跳转

        //用户的type 是boss还是牛人
        //用户是否完善信息

    }

    render(){
        return(
            <div></div>
        )
    }

}

export default AuthRoute