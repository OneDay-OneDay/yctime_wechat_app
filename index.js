// 首页幻灯片展示
exports.slide_show = function(req, res, next) {
  res.json({
      status_code : 200,
      list : [
          {
              thumb : "http://7xteli.com1.z0.glb.clouddn.com/oYYBAFbQZvmANDYqAAQhekyUj6s304_cover.jpg",
              type : 1,
              id : 1244026131
          },
          {
              thumb : "http://7xteli.com1.z0.glb.clouddn.com/oYYBAFbQZvmANDYqAAQhekyUj6s304_cover.jpg",
              type : 0,
              id : 1244026132
          },
          {
              thumb : "http://7xteli.com1.z0.glb.clouddn.com/oYYBAFbQZvmANDYqAAQhekyUj6s304_cover.jpg",
              type : 1,
              id : 1244026133
          }
      ]
    });
};