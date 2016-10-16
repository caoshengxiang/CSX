
###数据库启动##################
E:\an\MongoDB\Server\3.2\bin>mongod --dbpath "E:/an/MongoDB/data/db" --logpath "E:/an/MongoDB/log/log.txt" --serviceName "MongoDB"

### .gitignore文件忽略上传文件######################
.project
 node_modules
 bin
 

###package.json修改说明#########################
#之前的代码
"scripts": {
    "start": "node ./bin/www"
  },
 
#使用suporvisor来实现自动重启服务器
"scripts": {
    "start": "supervisor ./bin/www"
  },
  
#npm start 就是启动 node ./bin/www

# E:\iv\caosx>supervisor ./bin/www 检测的就是caosx目录下的文件改动

#修改package.json了suporvisor后 可使用 npm start 启动，检测修改目录同上


###gulp前端构建工具#####################
#npm init 可配置package.json
#npm install 安装开发依赖包
#gulp全局安装 npm install -g gulp
#项目根目录下创建并配置gulpfile.js
#gulp

###启动的时候将日志信息重定向到对应文件中
npm start 2>error.log

###npm install 默认安装所有依赖  npm install -production 安装dependences的依赖
