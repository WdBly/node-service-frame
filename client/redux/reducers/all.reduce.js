
const initState = {
    userName:localStorage.getItem("userName") || "",
    defaultUserName:"weidada",
    defaultPassword:123456,
    articleList:[]
};

export default function allReduce(state = initState, {type: TYPE, ...action}) {
    switch(TYPE) {
        case "login":
            return {
                ...state,
                userName: action.data.userName
            };
        case "logout":
            return {
                ...state,
                userName: action.data.userName
            };
        case "article":
            return {
                ...state,
                articleList: action.data.article
            };
        default:
            return state;
    }
}
