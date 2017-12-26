import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addGunAsync, addGun, removeGun} from "./index.redux";

import {Button} from 'antd-mobile';

@connect(
    //你要state什么属性放到props里
    state => ({num: state.counter}),
    // 你要什么方法，放到props里，自动dispatch
    {addGun, addGunAsync, removeGun}
)
class App extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h2>现在有机枪{this.props.num}把</h2>
                <Button onClick={this.props.addGun}>申请武器</Button>
                <Button onClick={this.props.removeGun}>上交武器</Button>
                <Button onClick={this.props.addGunAsync}>拖两天再给</Button>
            </div>
        )
    }
}


export default App