#!/usr/bin/env node

var schema = require('../models')
  , Pass = schema.Pass

var passes = [
  {
    "backgroundColor": "rgb(255,255,255)",
    description: "20% off",
    serialNumber: "123456",
    logoText: "Yeah!"
  },
  {
    "backgroundColor": "rgb(255,255,255)",
    description: "20% off",
    serialNumber: "123456",
    logoText: "Wa!"
  },
  {
    "backgroundColor": "rgb(255,255,255)",
    description: "20% off",
    serialNumber: "123456",
    logoText: "Booo!"
  }
]

passes.forEach(function(pass) {
  var p = new Pass(pass);
  p.save()
})