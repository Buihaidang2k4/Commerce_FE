# --- Giai đoạn 1: Build ứng dụng Vite ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Vite (kết quả nằm trong /app/dist)
RUN npm run build

# --- Giai đoạn 2: Serve bằng Nginx ---
FROM nginx:alpine

# Copy file dist (chứ không phải build)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
