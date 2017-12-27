import React, {Component} from 'react';
import Logo from "../../component/logo/logo";
import {List, WhiteSpace, InputItem, WingBlank, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from "../../redux/user.redux";
import "../../index.css"
const RadioItem = Radio.RadioItem;
@connect(
    state=>state.user,
    {register}
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister=this.handleRegister.bind(this);
    }

    handleChange(key, val) {
        this.setState({[key]: val});
    }
    handleRegister(){
        // console.log()
        this.props.register(this.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="err-msg">{this.props.msg}</p>:null}

                        <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type == "genius"}
                                   onClick={() => this.handleChange('type', "genius")}>牛人</RadioItem>
                        <RadioItem checked={this.state.type == "boss"}
                                   onClick={() => this.handleChange('type', "boss")}>Boss</RadioItem>

                        <Button type="primary" onClick={this.handleRegister}>注册</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register