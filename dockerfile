FROM node:20-alpine AS builder
WORKDIR /usr/src/app
# 1. 单独复制定义文件，充分利用Docker缓存
COPY package*.json ./
# 2. 安装所有依赖（包括devDependencies，用于构建）
RUN npm ci
# 3. 复制源代码
COPY . .
# 4. 执行构建命令（如 TypeScript 编译、webpack打包等）
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
# 只安装生产依赖
COPY package*.json ./
RUN npm ci --only=production
# 从上一阶段（builder）复制构建好的产物
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
# 暴露端口，启动应用
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ] # 确保路径指向你的构建输出目录