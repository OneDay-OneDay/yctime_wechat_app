var ProjectModel = require("../models/index").ProjectModel;
var AwardModel = require("../models/index").AwardModel;
var eventproxy = require("eventproxy");
var eventproxy = new eventproxy(  );


// 荣誉展示
exports.honor_show = function(req, res, next){
    ProjectModel.find({  }, function( err, docs ){
        if( err ){
            console.log( err )
            res.json({ status_code : 400, object : {  } })
        }
        if( docs ){
            eventproxy.emit( "get_projects", docs );
        }
    })
    AwardModel.find({  }, function( err, docs ){
        if( err ){
            console.log( err )
            res.json({ status_code : 400, object : {  } })
        }
        if( docs ){
            eventproxy.emit( "get_awards", docs );
        }
    })
    eventproxy.all("get_projects", "get_awards", function( all_projects, all_awards ){
        var projects = [  ];
        var awards = [  ];
        all_projects.forEach(function(project){
            projects.push({
                id : project._id,
                thumb : project.thumb,
                name : project.name,
                description : project.description
            })
        })
        all_awards.forEach(function(award){
            awards.push( award.award )           
        })
        res.json({
            status_code : 200,
            object : {
                projects : projects,
                awards : awards
            }
        })
    })
};

// 项目介绍
exports.project_intruduction = function(req, res, next){
    var project_id = req.query.id
    ProjectModel.find({ _id : project_id }, function( err, docs ){
        if( err ){
            res.json({ status_code : 400, object : {  } })
        }
        if( docs ){
            var new_images = [  ]
            docs[0].images.forEach(function(image){
                new_images.push({
                    thumb : image.thumb,
                    hd : image.hd,
                })
            })
            res.json({ 
                status_code : 200, 
                object : {
                    thumb : docs[0].thumb,
                    hd : docs[0].hd,
                    tag : docs[0].tag,
                    introduction : docs[0].introduction,
                    images : new_images
                } 
            })
        }
    })
};