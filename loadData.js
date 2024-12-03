import { MongoClient } from 'mongodb';
import csvtojson from 'csvtojson';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI, DATABASE_NAME, FESTIVALS_ONLY_FILE, PERFORMERS_ONLY_FILE } = process.env;

async function loadCsvToCollection(filePath, collectionName, db) {
    try {
        const data = await csvtojson().fromFile(filePath);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(data);
        console.log(`Successfully imported ${result.insertedCount} records into the ${collectionName} collection.`);
    } catch (error) {
        console.error(`Error importing data into the ${collectionName} collection:`, error);
    }
}

async function main() {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully.');

        const db = client.db(DATABASE_NAME);

        await loadCsvToCollection(FESTIVALS_ONLY_FILE, 'festivals', db);

        await loadCsvToCollection(PERFORMERS_ONLY_FILE, 'performers', db);

        console.log('Data import completed.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
        console.log('Connection to MongoDB closed.');
    }
}

main().catch(console.error);
