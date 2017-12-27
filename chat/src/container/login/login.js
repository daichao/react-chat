import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, WhiteSpace, InputItem, WingBlank, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux'
import Logo from "../../component/logo/logo";

@connect(
    state=>state.user,
    {login}
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login() {
        this.props.login(this.state)
    }

    handleChange(key, val) {
        this.setState({[key]: val});
    }

    register() {
        this.props.history.push("/register")
    }

    render() {
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="err-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
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

export default Login