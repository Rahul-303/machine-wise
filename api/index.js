import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dataRoutes from './routes/data.route.js';
import cors from 'cors';
import { generateSampleData } from './utils/sampleCodeGenerator.js';
import path from'path';
import fs from 'fs';
import Data from './models/data.model.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const app = express();
dotenv.config();

const PORT = 3000;
const url = process.env.MONGO;


mongoose
.connect(url)
.then(() => {
  console.log("connection established!");
  
})
.catch((error) => {
  console.log(error);
});

/**
 * uncomment this section if you want to add new data to the database. 
 * what i did was extracted sample_data send through mail and ran it once to add it in the DB.
 */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const jsonFilePath = path.resolve(__dirname, 'data', 'sample-data.json');
// const jsonFilePath = path.resolve(__dirname, 'data', 'sample.json');

//   const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

//   // Function to insert data in batches
//   const insertDataInBatches = async (data, batchSize) => {
//       try {
//           for (let i = 0; i < data.length; i += batchSize) {
//               const batch = data.slice(i, i + batchSize);
//               await Data.insertMany(batch);
//               console.log(`Batch ${i / batchSize + 1} inserted successfully`);
//           }
//           console.log('All data batches inserted successfully');
//       } catch (error) {
//           console.error('Error inserting data batches:', error);
//       } 
//   };
  
//   const batchSize = 50; // Number of documents per batch
  
//   insertDataInBatches(jsonData, batchSize);


/**
 * to generate sample data uncommnet the folowing code , implementation is in util class
 * 1-give a startingdate value
 * 2-give a ending date avlue
 * 3-interval seconds should always be 1 since we store vlue per second
 */
// const startDate = new Date('2024-01-21T15:00:00Z'); // example
// const endDate = new Date('2024-01-21T15:00:41Z');
// const intervalSeconds = 1;
// const sample_data = generateSampleData(startDate, endDate, intervalSeconds);
// console.log(sample_data);

app.use(express.json());
app.use(cors());//for cross-origin
app.use('/', dataRoutes);


app.listen(PORT, () =>{
    console.log(`server listening at port ${PORT}`);
})