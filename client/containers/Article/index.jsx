
import React, {Component} from "react";
import { connect } from "react-redux";
import action from "../../redux/action";
import "../../common/less/article.less";
import Login from "../Login";
import Register from "../Register";

class ArticleComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            userName:this.props.defaultUserName,
            password:this.props.defaultPassword,
            articleList:this.props.articleList
        }
    }

    componentDidMount(){
        this.fetchAarticleList();
    }

    fetchAarticleList = () => {
        this.setState({
            articleList:[]
        });
        this.props.dispatch(action.getArticleList())
    }

    logout = () => {
        this.props.dispatch(action.logout());
        this.fetchAarticleList();
    }

    render() {

        let list =  this.props.articleList && this.props.articleList.map(item => {
            return(
                <div key={item.Id} className="single-article">
                    <header>
                        <span>{item.name}</span>
                        <span>{item.auth}</span>
                        <span>{item.time}</span>
                    </header>
                    <section>
                        {item.content}
                    </section>
                </div>
            )
        })

        return (
            <div className="content-article">
                <div className="left-article">
                    <h2>
                        <span>文章列表</span>
                        <span onClick={this.fetchAarticleList}>重新获取</span>
                    </h2>
                    {this.props.userName ? list : <div className="no-login">请先登录后再查看文章</div>}
                </div>
                <div className="right">
                    <Login history={this.props.history} getArticleList={this.fetchAarticleList}/>
                    <Register history={this.props.history}/>
                    <div className="logout" onClick={this.logout}>
                        logout
                    </div>
                </div>
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
        getArticleList: () => dispatch(action.getArticleList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);