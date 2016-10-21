项目使用及介绍
===========

安装
-----------

### 安装mongodb数据库

### 安装node

项目启动
-------------

### 启动数据库
cmd进入mongodb安装目录下的bin目录，使用命令启动数据库: mongod --dbpath "数据库目录" --logpath "日志目录" --serviceName "自定义名称"
示例：E:\an\MongoDB\Server\3.2\bin>mongod --dbpath "E:/an/MongoDB/data/db" --logpath "E:/an/MongoDB/log/log.txt" --serviceName "MongoDB"

### 安装依赖
cmd进入项目更目录下（CSX目录下）使用命令：npm install安装依赖
npm install 默认安装所有依赖  
npm install -production 安装dependences的依赖

### 运行项目
访问：localhost:3000
可以在www文件下修改端口号，修改方法：打开www文件搜索3000将其替换成你的端口即可

其他一些说明
-------------

### .gitignore文件忽略上传文件
.project
 node_modules
 bin
 

### package.json修改说明
#### 之前的代码
"scripts": {
    "start": "node ./bin/www"
  },
 
#### 使用suporvisor来实现自动重启服务器(开发环境)
首先全局安装suporvisor: npm install suporvisor -g

"scripts": {
    "start": "supervisor ./bin/www"
  },
  
#### npm start 就是启动 node ./bin/www

#### 路径\CSX>supervisor ./bin/www 检测的就是caosx目录下的文件改动

#### 修改package.json了suporvisor后 可使用 npm start 启动，检测修改目录同上

#### 开发完成后将package.json修改回 node ./bin.www


### gulp前端构建工具
gulp全局安装 npm install -g gulp
项目根目录下创建并配置gulpfile.js
gulp

### 启动的时候将日志信息重定向到对应文件中
npm start 2>error.log

