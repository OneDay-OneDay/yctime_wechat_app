var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // 缩略图 URL
    thumb : { type : String },
    // 文章标题
    title : { type : String },
    // 文章描述
    description : { type : String },
    // 文章详情
    detail : { type : String },
    // 文章标签
    tag : { type: String },
    // 文章发布日期
    create_at : { type : Date, default : Date.now }
});

mongoose.model( "Article", ArticleSchema );