var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var ReplySchema = new Schema({
    // 回复所在问题
    question_id : { type : ObjectId },
    // 回复者微信昵称
    author : { type : String },
    // 回复者用户 id( 查询我的回复时可用 )
    author_id : { type : String }, 
    // 回复内容
    reply_content : { type : String },
    // 回复时间
    create_at : { type: Date, default: Date.now }
});

ReplySchema.index({ question_id : 1 });

mongoose.model( "Reply", ReplySchema );