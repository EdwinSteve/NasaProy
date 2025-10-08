# ===============================
# Etapa 1: Construcción (Build)
# ===============================
FROM node:22-alpine AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar la caché de Docker)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación para producción (Vite genera la carpeta 'dist')
RUN npm run build

# ===============================
# Etapa 2: Servidor (Nginx)
# ===============================
FROM nginx:alpine

# Eliminamos el archivo de configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos el build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional) Copiar configuración personalizada de Nginx para manejar rutas de React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto en el que Nginx servirá la app
EXPOSE 80

# Ejecutamos Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
