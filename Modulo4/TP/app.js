import express from 'express';
import mongoose from 'mongoose';
import { accountsRouter } from './routes/accountsRouter.js';

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://gupresoti:bootigti@cluster0.ch0ij.mongodb.net/my-bank?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log('Conexão ao MongoDB realizada com sucesso!');
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB\n' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountsRouter);

app.listen(3000, () => {
  console.log('API started...');
});
