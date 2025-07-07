# Koristimo oficijalni Node image
FROM node:20

# Postavljamo radni direktorijum u kontejneru
WORKDIR /app

# Kopiramo package fajlove (package.json i package-lock.json ako postoji)
COPY package*.json ./

# Instaliramo zavisnosti
RUN npm install

# Kopiramo ostatak koda
COPY . .

# Otvaramo port koji koristi aplikacija
EXPOSE 5000

# Pokrećemo aplikaciju
CMD ["npm", "start"]
