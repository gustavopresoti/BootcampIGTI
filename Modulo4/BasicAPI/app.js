import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './routes/studentRouter.js';

// Conectar ao MongoDB pelo Mongoose
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://gupresoti:bootigti@cluster0.ch0ij.mongodb.net/grades?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Conexão ao MongoDB realizada com sucesso!');
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB\n' + error);
  }
})();

mongoose.set('useFindAndModify', false);

const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => console.log('API started...'));
