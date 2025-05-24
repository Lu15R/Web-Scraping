# Quotes Scraper 📝

Este proyecto es un scraper web desarrollado en Node.js que recopila citas del sitio 
[https://quotes.toscrape.com](https://quotes.toscrape.com), desde la página 1 hasta la página 10. Por cada cita se extraen:

- **Quote**: El texto de la cita.
- **Author**: El nombre del autor.
- **Tags**: Los tags asociados a la cita.

Al finalizar, el script genera tres archivos con los resultados:

- `quotes.json`: Archivo en formato JSON.
- `quotes.csv`: Archivo en formato CSV.
- `quotes.xlsx`: Archivo en formato Excel.

---

## Instalación y como ejecutarlo

1. Clona o descarga este repositorio en tu computadora.

2. Abre una terminal en la carpeta del proyecto.

3. Ejecuta el siguiente comando para instalar las dependencias necesarias:

### 
1. Primero, inicializa tu proyecto con:

```bash
npm init -y
```

2. Luego instala las siguientes dependencias una por una:
```bash
npm init -y
npm install request
npm install request-promise
npm install cheerio
npm install json2csv
npm install xlsx
```
3. y por ultimo para ejecutar el scraper

```bash
node index.js
```

