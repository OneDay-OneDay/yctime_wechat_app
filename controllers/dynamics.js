var getDateDiff = require("../mini_fun/date_diff").getDateDiff;
var DynamicModel = require("../models/index").DynamicModel;

// 动态速递
exports.dynamics = function(req, res, next) {
    // 每一页默认返回 rows : 10 条数据
    var page = parseInt( req.query.page );
    var rows = 10;
    DynamicModel.find({  }, null, { skip : page*rows, limit : rows, sort : { "create_at" : -1 } }, function( err, docs ){
        if( err ){
            console.log( err )
            res.json({ status_code : 400, list : [  ] })
        }
        if( docs ){
            var new_docs = [  ]
            docs.forEach(function( doc ){
                new_docs.push({
                    id : doc._id,
                    thumb : doc.thumb,
                    title : doc.title,
                    description : doc.description,
                    is_month : getDateDiff(new Date( doc.create_at ))
                })
            })
            res.json({ status_code : 200, list : new_docs })
        }
    })
}