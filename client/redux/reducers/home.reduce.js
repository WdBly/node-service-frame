const initState = {
    base: {},
    info: {},
    itinerary: [],
    language: [],
    price_info: {},
    similar_list: [],
    comment_list: {},
    loading: true,
    go_next: false,
    pc_only: false
};

export default function productDetails(state = initState, {type: TYPE, ...action}) {
    switch(TYPE) {
        case "qqq":
            return {
                ...state,
                loading: action.loading
            };
        case "aaa":
            return Object.assign({}, action, ...state);
        default:
            return state;
    }
}
