import { createReadStream, writeFileSync } from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { stringify } from 'csv-stringify';

const inputFilePath = path.join(process.cwd(), 'festivals.csv');
const outputFilePath = path.join(process.cwd(), 'festivals-only.csv');

const fields = [
    "@type", "name", "identifier", "url", "image", "startDate",
    "endDate", "location/name", "location/identifier", "location/url",
"location/address/streetAddress",
"location/address/addressLocality",
"location/address/postalCode",
"location/address/addressCountry/identifier",
"location/address/addressCountry/name",
"location/address/x-timezone",
"location/geo/latitude",
"location/geo/longitude"
];

const extractPerformers = async (inputFilePath, outputFilePath, fields) => {
    return new Promise((resolve, reject) => {
        const performersData = [];

        createReadStream(inputFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const performer = {};
                fields.forEach(field => {
                    performer[field] = row[field] || '';
                });
                performersData.push(performer);
            })
            .on('end', () => {
                stringify(performersData, { header: true, columns: fields }, (err, output) => {
                    if (err) return reject(err);

                    writeFileSync(outputFilePath, output, 'utf8');
                    resolve(`Performers data has been written to ${outputFilePath}`);
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

extractPerformers(inputFilePath, outputFilePath, fields)
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error('Error during extraction:', error.message);
    });








