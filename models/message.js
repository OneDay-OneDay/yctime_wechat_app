var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

// 保存用户的留言消息
var LeaveMessageSchema = new Schema({
    // 留言标题
    title : { type : String },
    // 留言描述
    description : { type : String },
    // 留言作者微信昵称
    author : { type : String },
    // 留言时间
    create_at : { type: Date, default: Date.now }
});

// 保存系统发布的消息
var SystemMessageSchema = new Schema({
    // 系统消息标题
    title : { type : String },
    // 系统消息描述
    description : { type : String },
    // 系统消息作者
    author : { type : String, default : "云创时代团队" },
    // 系统发布的消息时间
    create_at : { type: Date, default: Date.now }
});

mongoose.model( "LeaveMessage", LeaveMessageSchema );
mongoose.model( "SystemMessage", SystemMessageSchema );