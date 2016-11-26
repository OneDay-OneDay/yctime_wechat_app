var express = require("express");
var router = express.Router();

var index = require("./controllers/index");
var dynamics = require("./controllers/dynamics");
var communication = require("./controllers/communication");
var honor = require("./controllers/honor");
var mine = require("./controllers/mine");

// 测试页面
router.get("/", function(req, res, next){
    res.render("index", { title : "测试页面" })
})

// 路由展示界面
router.get("/routes", function(req, res, next){
    res.render("routes", { title : "路由页面" })
})

// 获取幻灯片
router.get("/slide_show", index.slide_show);

// 获取幻灯片详情
router.get("/slide_detail", index.slide_detail);

// 动态速递
router.get("/dynamics", dynamics.dynamics);

// 技术文章列表
router.get("/articles", communication.articles);

// 获取技术文章详情
router.get("/article_detail", communication.article_detail);

// 提问问题列表
router.get("/questions", communication.questions);

// 技术交流搜索
router.get("/search", communication.search);

// 技术交流搜索-更多文章
router.get("/search_more_articles", communication.search_more_articles);

// 技术交流搜索-更多问题
router.get("/search_more_questions", communication.search_more_questions);

// 提问问题
router.post("/ask_question", communication.ask_question);

// 回复问题
router.post("/reply_question", communication.reply_question)

// 荣誉展示
router.get("/honor_show", honor.honor_show);

// 项目介绍
router.get("/project_intruduction", honor.project_intruduction);

// 给我们留言
router.post("/leave_message", mine.leave_message);

// 我的提问列表
router.get("/my_questions", mine.my_questions);

// 我的消息
router.get("/my_message", mine.my_message);

// 系统消息
router.get("/system_message", mine.system_message);

module.exports = router;