import React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/user.redux";
import Logo from "../../component/logo/logo";
import imoocForm from "../../component/imooc-form/imooc-form";
@connect(state => state.user, { login })
@imoocForm
class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state={
    //     user:'',
    //     pwd:''
    // }
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register() {
    this.props.history.push("/register");
  }
  handleLogin() {
    this.props.login(this.props.state);
  }
  // handleChange(key, value) {
  //     this.setState({
  //       [key]: value
  //      });
  //   }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== "/login" ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange("user", v)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange("pwd", v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
export default Login;
