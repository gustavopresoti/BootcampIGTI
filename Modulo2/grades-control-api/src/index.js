import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from '../routes/grade.js';

const { readFile, writeFile } = fs;

global.fileName = './public/grades.json';

const app = express();
app.use(express.json());

app.use('/grade', gradesRouter);

app.listen('3333', async () => {
  try {
    await readFile(global.fileName);

    console.log('API started...');
  } catch (err) {
    const initialJSON = {
      nextId: 1,
      grades: [],
    };

    writeFile(global.fileName, JSON.stringify(initialJSON))
      .then(() => {
        console.log('API started and File created...');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
