var fs = require( "fs" );
var path = require( "path" );
var formidable = require( "formidable" );
var eventproxy = require("eventproxy");
var eventproxy = new eventproxy(  );

var ArticleModel = require("../models/index").ArticleModel;
var QuestionModel = require("../models/index").QuestionModel;
var ReplyModel = require("../models/index").ReplyModel;
var getDateDiff2 = require("../mini_fun/date_diff").getDateDiff2;

var setting = require( "../setting" );
var host = setting.host;
var server = host.server;
var port = host.port;

// 技术文章列表
exports.articles = function(req, res, next) {
    // 每一页默认返回 rows : 10 条数据
    var page = parseInt( req.query.page );
    var rows = 10;
    ArticleModel.find({  }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function( err, docs ){
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
                    thumb : doc.thumb,
                    title : doc.title,
                    description : doc.description,
                    tag : doc.tag
                })
            })
            res.json({ status_code : 200, list : new_docs })
        }
    })
};

// 获取技术文章详情
exports.article_detail = function(req, res, next){
    var article_id = req.query.id
    ArticleModel.find({ _id : article_id }, function( err, docs ){
        if( err ){
            res.json({ status_code : 400, object : {  } })
        }
        if( docs ){
            res.json({ 
                status_code : 200, 
                object : {
                    title : docs[0].title,
                    detail : docs[0].detail
                } 
            })
        }
    })
}

// 提问问题列表
exports.questions = function(req, res, next) {
    // 每一页默认返回 rows : 10 条数据
    var page = parseInt( req.query.page );
    var rows = 10;
    QuestionModel.find({  }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function( err, docs ){
        if( err ){
            console.log( err )
            res.json({ status_code : 400, list : [  ] })
        }
        if( docs ){
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
            console.log( new_docs )
            res.json({ status_code : 200, list : new_docs })
        }
    })
};

// 技术交流搜索  文章和问题最多各自返回三条，所以说最多情况下可以返回6条
exports.search = function(req, res, next) {
    var keyword = req.query.content
    var limit = 3
    // 不区分大小写
    var reg = new RegExp( keyword, "i" )
    ArticleModel.find(
        { $or : 
            [ 
                { title : { $regex : reg } }, 
                { description : { $regex : reg } }, 
                { detail : { $regex : reg } }, 
                { tag : { $regex : reg } } 
            ] 
        }, null, { limit : limit, sort : { "create_at" : -1 } }, function(err, docs){
            if(err){
                console.log(err)
            }
            if(docs){
                eventproxy.emit( "get_articles", docs );
            }
    })
    QuestionModel.find(
        { $or : 
            [ 
                { title : { $regex : reg } }, 
                { description : { $regex : reg } },
                { tag : { $regex : reg } }
            ] 
        }, null, { limit : limit, sort : { "create_at" : -1 } }, function(err, docs){
            if(err){
                console.log(err)
            }
            if(docs){
                eventproxy.emit( "get_questions", docs );
            }
    })
    eventproxy.all("get_articles", "get_questions", function( search_articles, search_questions ){
        var articles = [  ]
        var questions = [  ]
        search_articles.forEach(function(article){
            articles.push({
                id : article._id,
                title : article.title,
                description : article.description,
                tag : article.tag
            })
        })
        search_questions.forEach(function(question){
            questions.push({
                id : question._id,
                title : question.title,
                description : question.description,
                tag : question.tag
            })           
        })
        res.json({
            status_code : 200,
            object : {
                articles : articles,
                questions : questions
            }
        })
    })
};

// 技术交流搜索-更多文章
exports.search_more_articles = function(req, res, next) {
    var keyword = req.query.content
    var page = parseInt( req.query.page )
    var rows = 10
    // 不区分大小写
    var reg = new RegExp( keyword, "i" )
    ArticleModel.find(
        { $or : 
            [ 
                { title : { $regex : reg } }, 
                { description : { $regex : reg } }, 
                { detail : { $regex : reg } }, 
                { tag : { $regex : reg } } 
            ] 
        }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function(err, docs){
            if(err){
                console.log(err)
            }
            if(docs){
                var new_docs = [  ]
                docs.forEach(function( doc ){
                    new_docs.push({
                        id : doc._id,
                        title : doc.title,
                        description : doc.description,
                        tag : doc.tag
                    })
                })
                console.log( new_docs )
                res.json({ status_code : 200, list : new_docs })
            }
    })
};

// 技术交流搜索-更多问题
exports.search_more_questions = function(req, res, next) {
    var keyword = req.query.content
    var page = parseInt( req.query.page )
    var rows = 10
    // 不区分大小写
    var reg = new RegExp( keyword, "i" )
    QuestionModel.find(
        { $or : 
            [ 
                { title : { $regex : reg } }, 
                { description : { $regex : reg } },
                { tag : { $regex : reg } }
            ] 
        }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function(err, docs){
            if(err){
                console.log(err)
            }
            if(docs){
                var new_docs = [  ]
                docs.forEach(function( doc ){
                    new_docs.push({
                        id : doc._id,
                        title : doc.title,
                        description : doc.description,
                        tag : doc.tag
                    })
                })
                console.log( new_docs )
                res.json({ status_code : 200, list : new_docs })
            }
    })
};

// 提问问题 
exports.ask_question = function(req, res, next) {
    // 图片文件将要上传到哪个文件夹下面
	var uploadfoldername = "images";
	var uploadfolderpath = path.resolve( __dirname, "../public/", uploadfoldername );
	// 参数设置
	var form = new formidable.IncomingForm({ encoding : "utf-8", uploadDir : uploadfolderpath, keepExtensions : true, maxFieldsSize : 20 * 1024 * 1024 })
	form.parse(req, function(err, fields, files){
		if(err){
            console.log(err)
        }
        // 立即结束响应 防止请求重置（ 好坑 ）
        res.json({ status_code : 200 })
        var filename = ( new Date(  ) ).getTime(  ) + ".jpg";
		var file_save_path = uploadfolderpath + "/" + filename;
		fs.rename(files.image.path, file_save_path, function( err ) {
			if ( err ) {
			      	console.log( err )
			}
            var filepath = "/" + uploadfoldername + "/" + filename;
            QuestionModel.create({
                title : fields.title,
                description : fields.description,
                author : fields.author,
                user_id : fields.user_id,
                tag : fields.tag,
                image : filepath
            }, function(err, doc){
                if(err){
                    console.log(err)
                }
                if(doc){
                    console.log(doc)
                }
            })
		})
	})
}

// 回复问题
exports.reply_question = function(req, res, next){
    var question_id = req.body.question_id
    var author = req.body.author
    var author_id = req.body.author_id
    var reply_content = req.body.reply_content
    ReplyModel.create({
        question_id : question_id,
        author : author,
        author_id : author_id,
        reply_content : reply_content
    }, function(err, doc){
        if(err){
            console.log(err)
            res.json({ status_code : 400,  })
        }
        if(doc){
            console.log(doc)
            res.json({ 
                status_code : 200, 
                object : {
                    question_id : doc.question_id,
                    author : doc.author,
                    author_id : doc.author_id,
                    reply_content : doc.reply_content,
                    create_at : getDateDiff2(new Date( doc.create_at ))
                } 
            })
        }
    })
}