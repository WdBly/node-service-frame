
import model from "../../model";


const articleListController = async function (ctx) {

    var result = await model.articleModel();

    ctx.body = result;
}

const user_ctrl = {
    articleListController
}

module.exports = user_ctrl;