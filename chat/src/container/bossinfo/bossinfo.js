import React from "react";
import { InputItem, NavBar, TextareaItem, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AvatarSelector from "../../component/avatarselector/avatarselector";
import { update } from "../../redux/user.redux";
@connect(state => state.user, { update })
class BossInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      desc: "",
      company: "",
      money: ""
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;

    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({ avatar: imgname });
          }}
        />
        <InputItem onChange={v => this.onChange("title", v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange("money", v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          autoHeight
          onChange={v => this.onChange("desc", v)}
        />
        <Button
          type="primary"
          onClick={() => {
            this.props.update(this.state);
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default BossInfo;
