import React from "react";
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

@connect(state => state.chat)
@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this.props.onPress(this.props.data.filter(v => !v.hide)[0].title);
  }

  render() {
    const navList = this.props.data.filter(v => !v.hide);
    // const { pathname } = this.props.location;
    console.log(navList);
    return (
      <TabBar className="am-tab-bar">
        {navList.map((v, i) => (
          <TabBar.Item
            badge={v.path === "/msg" ? this.props.unread : 0}
            key={v.path}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={this.state.selected === i}
            // selected={pathname === v.path}
            onPress={() => {
              // this.props.history.push(v.path);
              this.setState({ selected: i });
              this.props.onPress(v.title);
            }}
          >
            <div className="page-content">{v.component}</div>
          </TabBar.Item>
        ))}
      </TabBar>
    );
  }
}

export default NavLinkBar;
