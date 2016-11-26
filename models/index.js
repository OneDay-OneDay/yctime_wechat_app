var mongoose = require("mongoose");

// Schema
require("./slide");
require("./dynamic");
require("./honor");
require("./article");
require("./question");
require("./message");

exports.SlideModel = mongoose.model("Slide");
exports.DynamicModel = mongoose.model("Dynamic");
exports.ProjectModel = mongoose.model("Project");
exports.AwardModel = mongoose.model("Award");
exports.ArticleModel = mongoose.model("Article");
exports.QuestionModel = mongoose.model("Question");
exports.ReplyModel = mongoose.model("Reply");
exports.LeaveMessageModel = mongoose.model("LeaveMessage");
exports.SystemMessageModel = mongoose.model("SystemMessage");