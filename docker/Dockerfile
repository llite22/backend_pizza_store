# backend/Docker/Dockerfile
FROM node:20.18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Сборка приложения
RUN npm run build

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:dev"]