var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    // 缩略图 URL
    thumb : { type : String },
    // 项目展示大图 URL
    hd : { type : String }, 
    // 项目名称
    name : { type : String },
    // 项目描述
    description : { type : String },
    // 项目所属分类
    tag : { type : String },
    // 项目介绍
    introduction : { type : String },
    // 项目详情展示图
    images : [{
        thumb : { type : String },
        hd : { type : String }
    }]
});

var AwardSchema = new Schema({
    award : { type: String }
});

mongoose.model( "Project", ProjectSchema );
mongoose.model( "Award", AwardSchema );