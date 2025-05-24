// Requerir Modulos y librerias
const request = require('request');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');

//Arrays de links y resultados para scraping
let empresasArray = [];         
let paginacionArray = [];    
let resultadosArray = [];    

//Declarar Funcion Autoejecutable debe ser asincrona
(async () => {
    try {
        console.log(':::: Iniciando Proceso ::::');

        //Obtener título de la página principal
         //1.- HTTP Request para obtener la página
        let response = await requestPromise('https://quotes.toscrape.com/');

        let $ = cheerio.load(response);// Cargamos el html
        const tituloPagina = $('title').text();
        console.log("Título de la página:", tituloPagina);

        //Obtener solo 10 Paginas
        for (let i = 0; i < 10; i++) {
            if (i === 0) {
                paginacionArray.push('https://quotes.toscrape.com/');
            } else {
                paginacionArray.push(`https://quotes.toscrape.com/page/${i + 1}/`);
            }
        }

        //Recorrer cada página y obtener las citas
        for (let url of paginacionArray) {
            response = await requestPromise(url);
            $ = cheerio.load(response);

            $('div.quote').each(function () {
                const texto = $(this).find('span.text').text().trim();
                const autor = $(this).find('small.author').text().trim();

                let etiquetas = [];
                $(this).find('div.tags a.tag').each(function () {
                    etiquetas.push($(this).text().trim());
                });

                empresasArray.push({ texto, autor, etiquetas: etiquetas.join(', ') });
            });
        }

        for (let cita of empresasArray.slice(0, empresasArray.length)) {

            const objetoData = {
                quotes: cita.texto,
                author: cita.autor,
                tags: cita.etiquetas
            };

            resultadosArray.push(objetoData);
        }

        // Guardar en JSON
        fs.writeFileSync('quotes.json', JSON.stringify(resultadosArray, null, 2));
        console.log("✅ Archivo JSON creado: quotes.json");

        //  Guardar en CSV
        const parser = new Parser({ fields: ['quotes', 'author', 'tags'] });
        const csv = parser.parse(resultadosArray);
        fs.writeFileSync('quotes.csv', csv, 'utf-8');
        console.log("✅ Archivo CSV creado: quotes.csv");

        // Guardar en Excel
        const worksheet = XLSX.utils.json_to_sheet(resultadosArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Quotes');
        XLSX.writeFile(workbook, 'quotes.xlsx');
        console.log("✅ Archivo Excel creado: quotes.xlsx");

    } catch (error) {
        console.log("Error Obteniendo el Correo:", $(url), error.message);
    }
})();
