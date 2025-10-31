# Gunakan Node.js sebagai base image
FROM node:20.10-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json ke container
#COPY package.json package-lock.json ./

# Salin seluruh kode proyek ke container
COPY . .

# Install dependensi
#RUN npm i react-wordcloud
RUN npm install

RUN npm run build

# Expose port untuk Next.js
EXPOSE 5000

# Jalankan aplikasi dalam mode development
CMD ["npm", "run", "start"]
