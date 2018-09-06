const initState = {
    userName:"",
    defaultUserName:"weidada",
    defaultPassword:123456,
};

export default function homeReduce(state = initState, {type: TYPE, ...action}) {
    switch(TYPE) {
        case "login":
            return {
                ...state,
                userName: action.data.userName
            };
        default:
            return state;
    }
}
