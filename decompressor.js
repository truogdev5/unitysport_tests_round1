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

const reverseKeyMapping = Object.fromEntries(
   Object.entries(keyMapping).map(([full, short]) => [short, full])
);
async function decompressJSON(inputFile, outputFile) {
   try {
      const rawData = fs.readFileSync(inputFile, 'utf8');
      const data = JSON.parse(rawData);

      const queryString = Object.keys(data).find((key) => key !== 'uniques');
      const { uniques, [queryString]: indexedData } = data;

      const decompressedData = [];

      const numRecords = indexedData[Object.keys(indexedData)[0]].length;

      for (let i = 0; i < numRecords; i++) {
         let originalRecord = {};
         for (const shortKey in indexedData) {
            const fullKey = reverseKeyMapping[shortKey] || shortKey;

            originalRecord[fullKey] =
               uniques[shortKey][indexedData[shortKey][i]];
         }
         decompressedData.push(originalRecord);
      }

      const outputData = { [queryString]: decompressedData };

      fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
      console.log(`✅ JSON đã giải nén và lưu tại: ${outputFile}`);
   } catch (error) {
      console.log('♥️ ~ decompressJSON ~ error:', error);
   }
}

const inputFilePath = path.join(__dirname, 'compress', 'compressed.json');
const outputFilePath = path.join(__dirname, 'compress', 'decompressed.json');

decompressJSON(inputFilePath, outputFilePath);
