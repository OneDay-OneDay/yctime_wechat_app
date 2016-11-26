var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReplySchema = require("./reply").ReplySchema;

var QuestionSchema = new Schema({
    // 是否被置顶
    is_top : { type : Boolean, default : false },
    // 问题标题
    title : { type : String },
    // 问题描述
    description : { type : String },
    // 作者微信昵称
    author : { type : String },
    // 作者 id ( 查看该用户所有提问时会用到 )
    user_id : { type : String },
    // 问题提问时间
    create_at : { type: Date, default: Date.now },
    // 问题标签
    tag : { type : String },
    // 问题补充图片
    image : { type : String }
});

QuestionSchema.index({ user_id : 1 });

mongoose.model( "Question", QuestionSchema );