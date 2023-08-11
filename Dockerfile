# 使用一个 Node.js 镜像作为基础镜像
FROM node:18.16.0

WORKDIR /app

COPY . .

# 暴露 Nest.js 默认端口
EXPOSE 3008

# 运行 Nest.js 应用
CMD ["pnpm", "run", "start:prod"]