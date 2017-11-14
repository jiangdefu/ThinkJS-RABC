# ThinkJS-RABC
ThinkJS-RABC 是一款基于[ThinkJS](https://thinkjs.org/)框架开发的简易权限管理系统,目前主要包含用户、用户组管理，菜单管理，字典、字典组管理，菜单分配，系统操作日志几大功能，页面布局采用Bootstrap布局，适应不同尺寸屏幕。
# 需要环境
[NodeJS](https://nodejs.org/)，版本大于6.0
[MySQL](https://www.mysql.com/)，版本大于5.5
# 启动运行
克隆代码后进入根目录，运行 npm install 安装依赖文件。
打开MySQL创建数据库rabc，执行think-rabc.sql里面的语句创建表结构，然后分别执行其他的sql文件里面的语句插入基础数据。
打开项目文件src/common/config/db.js配置数据库连接信息
`host:'127.0.0.1',                  //主机信息
port: '3306',                       //连接端口
database: 'rabc',                   //数据库名称
user: 'root',                       //用户名
password: 'NJDIG@2017shuyao.com',   //密码
prefix: 'rabc_',                    //表前缀
encoding: 'utf8'`                   //编码
配置好数据库连接信息之后，在项目目录下打开命令行输入命令 node www/development.js
打开浏览器在地址栏输入 http:/127.0.0.1:8360 即可看到登陆页面 默认登陆用户是 admin，密码是 123456
## 系统登陆页面
![login](https://raw.githubusercontent.com/jiangdefu/ThinkJS-RABC/master/www/static/admin/img/login.png)
## 锁屏界面
![lock](https://raw.githubusercontent.com/jiangdefu/ThinkJS-RABC/master/www/static/admin/img/lock.png)
## 用户管理
![user](https://raw.githubusercontent.com/jiangdefu/ThinkJS-RABC/master/www/static/admin/img/user.png)
## 字典管理
![dict](https://raw.githubusercontent.com/jiangdefu/ThinkJS-RABC/master/www/static/admin/img/dict.png)
## 权限管理
![dict](https://raw.githubusercontent.com/jiangdefu/ThinkJS-RABC/master/www/static/admin/img/rabc.png)