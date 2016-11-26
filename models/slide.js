var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var SlideSchema = new Schema({
    // 缩略图 URL
    thumb : { type : String },
    // 类别，0 代表动态事件，1 代表文章，2 代表提问问题
    type : { type : Number },
    // 内容对应 ID
    content_id : { type : ObjectId }
});
 
mongoose.model( "Slide", SlideSchema );