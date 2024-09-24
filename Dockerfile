# Etapa 1: Construcción
FROM node:14 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa 2: Servir archivos estáticos
FROM node:14

# Instalar el servidor estático
RUN yarn global add serve

# Copiar los archivos estáticos construidos desde la etapa de construcción
COPY --from=build /app/build /app/build

# Verificar que los archivos se copien correctamente
RUN ls -la /app/build

# Establecer el directorio de trabajo
WORKDIR /app

# Exponer el puerto que usará el servidor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["serve", "-s", "build", "-l", "3000"]