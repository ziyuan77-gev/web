# 这里是xhdndmm.cn的源代码 以下内容为介绍部分
## 网站后端如何部署
**注：以ubuntu_20.04系统为例**
### WEB服务器
可以使用nginx作为web服务器 配置文件如下
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        listen [::]:80;
        root （网站根目录）;
        index index.html;

        server_name （网站域名）;

        access_log （日志目录）;
        error_log （日志目录）;

        location / {
            try_files $uri $uri/ =404;
        }

        location /time_api {
            proxy_pass http://127.0.0.1:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```
### 后端启用方法
安装依赖
```
sudo apt update
sudo apt install python3-pip gunicorn 
pip install Flask
pip install ntplib
pip install datetime
pip install gunicorn 
```
进入网站根目录/time_api并运行以下命令
```
gunicorn --bind 0.0.0.0:5000 main:app --daemon
```
## 声明
**如果你想使用本仓库代码作为你的个人博客 请删去关于我的所有内容 谢谢**
