const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/match', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = mongoose 
