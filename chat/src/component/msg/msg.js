import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
@connect(state=>state)
@withRouter
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1];
    }
    render(){
        const Item=List.Item;
        const Brief=Item.Brief;
        const userid=this.props.user._id;//当前登录id
        const userinfo=this.props.chat.users;
        const msgGroup={};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid]=msgGroup[v.chatid]||[];
            msgGroup[v.chatid].push(v);
        });
        // 按照聊天用户分组，根据chatid
        // 将最新消息放到最顶端
        const chatList=Object.values(msgGroup).sort((a,b)=>{
            const a_last=this.getLast(a).create_time;
            const b_last=this.getLast(b).create_time;
            return b_last-a_last;
        });


        return(
            <div>
               
                    {chatList.map(v=>{
                        const lastItem=this.getLast(v)
                        const targetId=v[0].from===userid?v[0].to:v[0].from;
                        const unreadNum=v.filter(v=>!v.read&&v.to===userid).length;
                        if(!userinfo[targetId]){
                            return null;
                        }
                        return (
                            <List key={lastItem._id}>
                            <Item 
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                            arrow="horizontal"
                            onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}>
                            {lastItem.content}
                            <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                            </List>
                        )
                    })}
                
            </div>
        )
    }
}

export default Msg;