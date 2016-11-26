var QuestionModel = require("../models/index").QuestionModel;
var LeaveMessageModel = require("../models/index").LeaveMessageModel;
var SystemMessageModel = require("../models/index").SystemMessageModel;
var QuestionModel = require("../models/index").QuestionModel;
var ReplyModel = require("../models/index").ReplyModel;
var getDateDiff2 = require("../mini_fun/date_diff").getDateDiff2;

// 给我们留言
exports.leave_message = function(req, res, next) {
  var message_title = req.body.title;
  var message_description = req.body.description;
  var message_author = req.body.author;
  LeaveMessageModel.create({
    title : message_title,
    description : message_description,
    author : message_author
  }, function(err, doc){
    if(err){
      console.log(err)
      res.json({ status_code : 400 })
    }
    if(doc){
      console.log(doc)
      res.json({ status_code : 200 })
    }
  })
};

// 我的提问列表
exports.my_questions = function(req, res, next) {
  var page = parseInt( req.query.page );
  var user_id = req.query.user_id;
  var rows = 10;
  QuestionModel.find({ user_id : user_id }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function( err, docs ){
        if( err ){
            console.log( err )
            res.json({ status_code : 400, list : [  ] })
        }
        if( docs ){
            console.log( docs )
            var new_docs = [  ]
            docs.forEach(function( doc ){
                new_docs.push({
                    id : doc._id,
                    is_top : doc.is_top,
                    title : doc.title,
                    description : doc.description,
                    author : doc.author,
                    time : getDateDiff2(new Date( doc.create_at )),
                    tag : doc.tag
                })
            })
            res.json({ status_code : 200, list : new_docs })
        }
    })
};

// 我的消息( 别人给我的问题的回复 )
exports.my_message = function(req, res, next) {
  var page = parseInt( req.query.page )
  var user_id = req.query.user_id
  var rows = 10
  // 查询我提问的所有问题
  QuestionModel.find({ user_id : user_id }, function(err, docs){
    if(err){
      console.log(err)
      res.json({ status_code : 400, list : [  ] })
    }
    if(docs){
       // 该用户所有提问问题的 id 数组
       var questions = [  ]
       docs.forEach(function(doc){
         questions.push(doc._id)
       })
       // 查询 questions 数组包含所有问题下的所有回复
       ReplyModel
        .find({  })
        .where("question_id").in(questions)
        .skip(page*rows)
        .limit(rows)
        .sort("-create_at")
        .exec(function(err, docs){
          if(err){
            console.log(err)
            res.json({ status_code : 400, list : [  ] })
          }
          if(docs){
            var reply_list = [  ]
            docs.forEach(function(doc){
              reply_list.push({
                id : doc.question_id,
                content : doc.reply_content,
                author : doc.author,
                time : getDateDiff2(new Date( doc.create_at ))
              })
            })
            res.json({ status_code : 200, list : reply_list })
          }
        })
    }
  })
};

// 系统消息
exports.system_message = function(req, res, next) {
  var page = parseInt( req.query.page );
  var rows = 10;
  SystemMessageModel.find({  }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function(err, docs){
    if(err){
      console.log(err);
      res.json({ status_code : 400, list : [  ] })
    }
    if(docs){
      console.log(docs)
      var new_docs = [  ]
      docs.forEach(function( doc ){
        new_docs.push({
          title : doc.title,
          description : doc.description,
          author : doc.author,
          time : getDateDiff2(new Date( doc.create_at ))
        })
      })
      res.json({ status_code : 200, list : new_docs })
    }
  })
};