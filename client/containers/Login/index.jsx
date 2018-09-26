import React, {Component} from "react";
import { connect } from "react-redux";
import action from "../../redux/action";
import "../../common/less/login.less";

class LoginComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            userName:this.props.defaultUserName,
            password:this.props.defaultPassword,
        }
    }

    componentDidMount(){
    
    }

    register = () => {
        this.props.history.push("/register");
    }

    lookArticle = () => {
        this.props.history.push("/article");
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
        this.props.dispatch(action.userLogin(this.state,this.props.getArticleList));
    }


    render() {
        return (
            <div className="content-login">
                <div>用户登陆模块</div>
                <input type="text" onChange={this.handleChangeUserNmae} 
                defaultValue={this.state.userName} className="login-input" placeholder="用户名"/>

                <input type="password" onChange={this.handleChangePassword} 
                defaultValue={this.state.password} className="password-input" placeholder="用户密码"/>
                <span onClick={this.submit}>login</span>

                <div>当前用户:{this.props.userName || "空"}</div>
                <div onClick={this.lookArticle}>{this.props.userName && "查看文章"}</div>
                <span onClick={this.register}>go register</span>
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
        userLogin: () => dispatch(action.userLogin())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);