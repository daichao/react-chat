import React,{Component} from 'react';
import Logo from "../../component/logo/logo";
import {List, WhiteSpace, InputItem, WingBlank, Button} from 'antd-mobile'
class Login extends  Component{
    constructor(props){
        super(props);
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
    }

    login(){

    }
    register(){
        this.props.history.push("/register")
    }

    render(){
        return(
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password">密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export  default Login