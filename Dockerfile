# 使用一个 Node.js 镜像作为基础镜像
FROM node:16.18.0

# 设置时区
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

# 创建工作目录
RUN mkdir /app

WORKDIR /app

COPY . .

RUN yarn

# 暴露 Nest.js 默认端口
EXPOSE 3008

# 运行 Nest.js 应用
CMD ["yarn", "start:prod"]