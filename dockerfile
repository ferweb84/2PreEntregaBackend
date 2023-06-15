# Crea un contenedor de node
FROM node

# Crea la carpeta "app"
WORKDIR /app

# Agarra todos los package.json que encuentres y los pones en la carpeta /app
COPY package*.json ./

# Ejecuta el comando npm install para instalar las dependencias
RUN npm install

# Agarra el resto del código y los copias en la carpeta /app
COPY . .

# Corre en el puerto 8080 en este contenedor
EXPOSE 8080

# Ejecuta el comando npm run start
CMD ["npm", "run", "start"]