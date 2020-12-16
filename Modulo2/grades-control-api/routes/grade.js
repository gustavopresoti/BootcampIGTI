import express from 'express';
import { promises as fs, read } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/create', async (req, res) => {
  try {
    let grade = req.body;
    // prettier-ignore
    if(!grade.student || !grade.subject || !grade.type || grade.value == null){
      throw new Error('Todos os campos são obrigatórios');
    }

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    console.log(grade);

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const grade = req.body;
    // prettier-ignore
    if(!grade.student || !grade.subject || !grade.type || grade.value == null){
      throw new Error('Todos os campos são obrigatórios');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(
      (eachGrade) => eachGrade.id === grade.id
    );

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const grade = req.body;

    if (!grade.id) {
      throw new Error('Informe um ID para remover');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const newData = data.grades.filter(
      (eachGrade) => eachGrade.id !== grade.id
    );

    if (newData.length === data.grades.length) {
      throw new Error('ID não encontrado!');
    }

    data.grades = newData;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/find', async (req, res) => {
  try {
    const grade = req.body;
    if (!grade.id) {
      throw new Error('Informe um ID');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const found = data.grades.find((eachGrade) => eachGrade.id === grade.id);

    if (!found) {
      throw new Error('ID não encontrado!');
    }

    res.send(found);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/getTotalGrade', async (req, res) => {
  try {
    const grade = req.body;
    if (!grade.student || !grade.subject) {
      throw new Error('Todos os campos são obrigatórios!');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const found = data.grades.filter(
      (eachGrade) =>
        eachGrade.student === grade.student &&
        eachGrade.subject === grade.subject
    );

    if (!found) {
      throw new Error('Grade não encontrada!');
    }

    const totalGrade = found.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    res.send(`Nota total: ${totalGrade}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/getMedia', async (req, res) => {
  try {
    const grade = req.body;
    if (!grade.subject || !grade.type) {
      throw new Error('Todos os campos são obrigatórios!');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const found = data.grades.filter(
      (eachGrade) =>
        eachGrade.subject === grade.subject && eachGrade.type === grade.type
    );

    if (!found) {
      throw new Error('Grade não encontrada!');
    }

    const totalGrade = found.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    res.send(`Media de notas: ${totalGrade / found.length}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/getBestGrades', async (req, res) => {
  try {
    const grade = req.body;
    if (!grade.subject || !grade.type) {
      throw new Error('Todos os campos são obrigatórios!');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const found = data.grades.filter(
      (eachGrade) =>
        eachGrade.subject === grade.subject && eachGrade.type === grade.type
    );

    if (!found) {
      throw new Error('Grade não encontrada!');
    }

    found.sort((a, b) => {
      return b.value - a.value;
    }).length = 3;

    res.send(found);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
