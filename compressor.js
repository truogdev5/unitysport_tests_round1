const fs = require('fs');
const path = require('path');

const keyMapping = {
   id: 'i',
   season_id: 'si',
   stage_id: 'sti',
   group_num: 'gn',
   round_num: 'rn',
   start_time: 'st',
   start_timestamp: 'sts',
   sport_event_status: 'ses',
   status_id: 'sid',
   updated_at: 'ua',
   record_updated_at: 'rua',
   home_team_id: 'hti',
   away_team_id: 'ati',
   competition_id: 'ci',
   lineup: 'l',
   venue_id: 'vi',
   referee_id: 'ri',
   related_id: 'rid',
   agg_score: 'as',
};
async function compressJSON(inputFile, outputFile) {
   try {
      const rawData = fs.readFileSync(inputFile, 'utf8');
      const originalSize = Buffer.byteLength(rawData, 'utf8') / 1024;
      const data = JSON.parse(rawData);

      const queryString = Object.keys(data)[0];

      const uniques = {};
      const grouped = {};

      const records = data[queryString];

      for (const record of records) {
         for (const recordKey in record) {
            /**
             * shortkey
             * */
            const shortKey = keyMapping[recordKey] || recordKey;

            if (!grouped[shortKey]) {
               grouped[shortKey] = [];
            }

            if (!uniques[shortKey]) {
               uniques[shortKey] = [];
            }

            let value = record[recordKey];
            let valueIndex = uniques[shortKey].indexOf(value);

            if (valueIndex === -1) {
               uniques[shortKey].push(value);
               valueIndex = uniques[shortKey].length - 1;
            }

            grouped[shortKey].push(valueIndex);
         }
      }

      const outputData = { uniques, [queryString]: grouped };

      fs.writeFileSync(outputFile, JSON.stringify(outputData));
      const compressedSize = fs.statSync(outputFile).size / 1024;

      console.log(`Before: ${originalSize.toFixed(2)} KB`);
      console.log(`After: ${compressedSize.toFixed(2)} KB`);
      console.log(
         `Saved: ${(100 - (compressedSize / originalSize) * 100).toFixed(2)}%`
      );
   } catch (error) {
      console.log('♥️ ~ compressJSON ~ error:', error);
   }
}

const inputFilePath = path.join(__dirname, 'data.json');
const outputFilePath = path.join(__dirname, 'compress', 'compressed.json');

compressJSON(inputFilePath, outputFilePath);
