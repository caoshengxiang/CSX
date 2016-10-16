var gulp = require('gulp'); 

var jshint = require('gulp-jshint');//Link任务会检查 js/ 目录下得js文件有没有报错或警告。
var less = require('gulp-less');//编译less
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
var rename = require('gulp-rename');//重命名