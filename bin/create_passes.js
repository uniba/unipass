#!/usr/bin/env node

var schema = require('../models')
  , Pass = schema.Pass

// var passes = [
//   {
//     "backgroundColor": "rgb(255,255,255)",
//     description: "20% off",
//     serialNumber: "123456",
//     logoText: "Yeah!"
//   },
//   {
//     "backgroundColor": "rgb(255,255,255)",
//     description: "20% off",
//     serialNumber: "123456",
//     logoText: "Wa!"
//   },
//   {
//     "backgroundColor": "rgb(255,255,255)",
//     description: "20% off",
//     serialNumber: "123456",
//     logoText: "Booo!"
//   }
// ]

// passes.forEach(function(pass) {
//   var p = new Pass(pass);
//   p.save()
// })

// Pass.findOne({ _id: "5077bd7912539dd903000001" }, function(err, pass) {
//   console.log(pass);
// });

Pass.find({}, function(err, passes) {
  console.log(passes);
});