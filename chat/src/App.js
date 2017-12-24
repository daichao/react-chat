import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addGunAsync, addGun, removeGun} from "./index.redux";
import {Button} from 'antd-mobile';

// const mapStatetoProps = (state) => {
//     return {num: state}
// }
// const actionCreators = {addGun, addGunAsync, removeGun}

// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
    state => ({num: state}),//你要state什么属性放到props里
    {addGun, addGunAsync, removeGun}//你要什么方法，放到props里，自动dispatch
)
class App extends Component {

    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <Button onClick={this.props.addGun}>申请武器</Button>
                <Button onClick={this.props.removeGun}>上交武器</Button>
                <Button onClick={this.props.addGunAsync}>拖两天再给</Button>
            </div>

        )
    }
}


export default App