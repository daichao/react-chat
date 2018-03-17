import React from "react";
import { connect } from "react-redux";
import { Result, List, Button, WhiteSpace, Modal } from "antd-mobile";
import browserCookie from "browser-cookies";
@connect(state => state.user)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;
    alert("注销", "确认退出登录吗？", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Ok",
        onPress: () => {
          browserCookie.erase("userid");
          window.location.href = window.location.href;
        }
      }
    ]);
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = List.Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={
            <img
              style={{ width: 50 }}
              src={require(`../img/${props.avatar}.png`)}
              alt=""
            />
          }
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />

        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {props.title}
            {props.desc.split("\n").map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : null;
  }
}

export default User;
