var SlideModel = require("../models/index").SlideModel;
var DynamicModel = require("../models/index").DynamicModel;
var ArticleModel = require("../models/index").ArticleModel;
var QuestionModel = require("../models/index").QuestionModel;

// 幻灯片展示
exports.slide_show = function(req, res, next) {
    // index 参数为 true 时返回首页幻灯片（没有提问问题）
    // index 参数为 false 时返回技术交流页面幻灯片（没有动态事件）
    // type : 0 代表动态事件，1 代表技术文章，2 代表提问问题
    var index = req.query.index;
    if( index == "true" ){
        console.log( "返回首页幻灯片（没有提问问题）" )
        SlideModel.find({ "type" : { "$ne" : 2 } }, function( err, docs ){
            if( err ){
                console.log( err )
                res.json({ status_code : 400, list : [  ] })
            }
            if( docs ){
                var new_docs = [  ]
                docs.forEach(function(doc){
                    new_docs.push({
                        thumb : doc.thumb,
                        type : doc.type,
                        id : doc.content_id
                    })
                })
                res.json({ 
                    status_code : 200, 
                    list : new_docs
                })
            }
        })
    }else{
        console.log( "返回技术交流页面幻灯片（没有动态事件）" )
        SlideModel.find({ "type" : 2 }, function( err, docs ){
            if( err ){
                console.log( err )
                res.json({ status_code : 400, list : [  ] })
            }
            if( docs ){
                var new_docs = [  ]
                docs.forEach(function(doc){
                    new_docs.push({
                        thumb : doc.thumb,
                        type : doc.type,
                        id : doc.content_id
                    })
                })
                res.json({ 
                    status_code : 200, 
                    list : new_docs
                })
            }
        })
    }
};

// 获取幻灯片详情
exports.slide_detail = function(req, res, next){
    // type : 0 代表动态事件，1 代表技术文章，2 代表提问问题
    var type = parseInt( req.query.type )
    var id = req.query.id

    switch ( type ) {
        case 0:
            DynamicModel.findOne({ _id : id }, function( err, doc ){
                if( err ){
                    console.log( err )
                }
                if( doc ){
                    res.json({ 
                        status_code : 200, 
                        object : doc
                    })
                }else{
                    res.json({ 
                        status_code : 400, 
                        object : {  }
                    })
                }
            })
            break;
        case 1:
            ArticleModel.findOne({ _id : id }, function( err, doc ){
                if( err ){
                    console.log( err )
                }
                if( doc ){
                    res.json({ 
                        status_code : 200, 
                        object : doc
                    })
                }else{
                    res.json({ 
                        status_code : 400, 
                        object : {  }
                    })
                }
            })
            break;
        case 2:
            QuestionModel.findOne({ _id : id }, function( err, doc ){
                if( err ){
                    console.log( err )
                }
                if( doc ){
                    res.json({ 
                        status_code : 200, 
                        object : doc 
                    })
                }else{
                    res.json({ 
                        status_code : 400, 
                        object : {  }
                    })
                }
            })
            break;
        default:
            res.json({ status_code : 400, object : {  } })
            break;
    }

}