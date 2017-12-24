import  React,{Component} from 'react';
// import {addGUN} from "./index.redux";
import {Button} from 'antd-mobile';
class App extends Component{
    constructor(){
        super();
    }

    render(){
        const store=this.props.store;
        const num=store.getState();
        const addGun=this.props.addGun;
        const removeGun=this.props.removeGun;
        const addGunAsync=this.props.addGunAsync;
        return(
            <div>
                <h1>现在有机枪{num}把</h1>
                <Button  onClick={()=>store.dispatch(addGun())}>申请武器</Button>
                <Button  onClick={()=>store.dispatch(removeGun())}>上交武器</Button>
                <Button  onClick={()=>store.dispatch(addGunAsync())}>拖两天再给</Button>
            </div>

        )
    }
}



export  default  App