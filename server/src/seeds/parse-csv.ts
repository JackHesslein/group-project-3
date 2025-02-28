import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Park } from '../models/index.js';
import db from '../config/connection.js';


// create __dirname if not exists
const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);

const results: any = [];
await db();
fs.createReadStream(path.join(__dirname, '../../assets/Amphibians_on_NPS.csv'))
  .pipe(csv())
//   @ts-ignore
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    for (let i = 0; i < results.length; i++) {
    // Park_Name
    // Common names
    const { Park_Name, Common_Names } = results[i];
// check if park exists
 let park = await Park.findOne({ name: Park_Name.trim() });

// if not, create park
if (!park) {
    park = await Park.create ({ name: Park_Name, code: Park_Name });

  };
// check if species is in the park
// if it is, skip it
// if not, put species in park
if (!park.species.includes(Common_Names)) {
    park.species.push(Common_Names);
    park.save();
    };


      // console.log(results[i]);
    }
  });