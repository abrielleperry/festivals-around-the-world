import { createReadStream, writeFileSync } from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { stringify } from 'csv-stringify';

const inputFilePath = path.join(process.cwd(), 'festivals.csv');
const outputFilePath = path.join(process.cwd(), 'performersOnly.csv');

const fieldsToDelete = new Set([
    "@type", "name", "identifier", "url", "image", "datePublished", "dateModified", "eventStatus", "startDate",
    "endDate", "previousStartDate", "doorTime", "location/@type", "location/name", "location/identifier",
    "location/url", "location/image", "location/datePublished", "location/dateModified", "location/address/@type",
    "location/address/streetAddress", "location/address/addressLocality", "location/address/postalCode",
    "location/address/addressCountry/@type", "location/address/addressCountry/identifier",
    "location/address/addressCountry/name", "location/address/addressCountry/alternateName",
    "location/address/x-streetAddress2", "location/address/x-timezone", "location/address/x-jamBaseMetroId",
    "location/address/x-jamBaseCityId", "location/geo/@type", "location/geo/latitude", "location/geo/longitude",
    "location/maximumAttendeeCapacity", "location/x-isPermanentlyClosed", "location/x-numUpcomingEvents",
    "offers/0/@type", "offers/0/name", "offers/0/identifier", "offers/0/url", "offers/0/datePublished",
    "offers/0/dateModified", "offers/0/category", "offers/0/seller/@type", "offers/0/seller/name",
    "offers/0/seller/identifier", "offers/0/seller/disambiguatingDescription", "offers/0/validFrom"
]);

const deleteFieldsFromCSV = async (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        const filteredData = [];
        let headerKeys = [];

        createReadStream(inputFilePath)
            .pipe(csvParser())
            .on('headers', (headers) => {
                // Filter out the fields to delete from the headers
                headerKeys = headers.filter(header => !fieldsToDelete.has(header));
            })
            .on('data', (row) => {
                const filteredRow = {};
                headerKeys.forEach(key => {
                    filteredRow[key] = row[key];
                });
                filteredData.push(filteredRow);
            })
            .on('end', () => {
                stringify(filteredData, { header: true, columns: headerKeys }, (err, output) => {
                    if (err) return reject(err);

                    writeFileSync(outputFilePath, output, 'utf8');
                    resolve(`Filtered data has been written to ${outputFilePath}`);
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

deleteFieldsFromCSV(inputFilePath, outputFilePath)
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
