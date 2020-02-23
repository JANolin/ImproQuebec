const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = mongoose 
