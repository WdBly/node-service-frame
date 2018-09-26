
import React, {Component} from "react";
import { connect } from "react-redux";
import action from "../../redux/action";
import "../../common/less/register.less";
import { log } from "util";

class RegisterComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            userName:this.props.defaultUserName,
            password:this.props.defaultPassword,
        }
    }

    componentDidMount(){
        
    }

    login = () => {
        console.log(this.props);
        
        this.props.history.push("/login");
    }

    handleChangeUserNmae = (e) => {
        this.setState({
            userName:e.target.value
        })
        
    }
    handleChangePassword = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    submit = () => {
        this.props.dispatch(action.register(this.state))
    }


    render() {
        return (
            <div className="content-register">
                <div>用户注册模块</div>
                <input type="text" onChange={this.handleChangeUserNmae} 
                defaultValue={this.state.userName} className="login-input" placeholder="用户名"/>

                <input type="password" onChange={this.handleChangePassword} 
                defaultValue={this.state.password} className="password-input" placeholder="用户密码"/>
                <span onClick={this.submit}>register</span>

                <div>当前用户:{this.props.userName || "空"}</div>
                <span onClick={this.login}>go login</span>
         
            </div>
        );
    }
}


//redux 两方面 第一个获取状态 states  第二个发送行为（包括获取数据的行为）
const mapStateToProps = state => {
    return {
        ...state.allReduce
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        register: () => dispatch(action.register())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);