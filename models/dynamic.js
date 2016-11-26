var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DynamicSchema = new Schema({
    // 缩略图 URL
    thumb : { type : String },
    // 动态标题
    title : { type : String },
    // 动态描述
    description : { type : String },
    // 动态发布时间
    create_at : { type: Date, default: Date.now }
});

mongoose.model( "Dynamic", DynamicSchema );