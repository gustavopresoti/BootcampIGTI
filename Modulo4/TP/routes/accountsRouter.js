import express from 'express';
import { accountsModel } from '../models/accountsModel.js';

const app = express();

app.patch('/accounts/deposit', async (req, res) => {
  try {
    const { depositValue } = req.body;

    const agency = req.get('agencia');
    const accountNumber = req.get('conta');

    const account = await accountsModel.findOne({
      agencia: agency,
      conta: accountNumber,
    });

    if (account) {
      account.balance += depositValue;

      await account.updateOne({ balance: account.balance }, { new: true });

      res.status(200).send({ balance: account.balance });
    } else {
      res.status(404).send({ error: 'Account not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Deposit error!' });
  }
});

app.put('/accounts/withdraw', async (req, res) => {
  try {
    const { withdrawValue } = req.body;

    const agency = req.get('agencia');
    const accountNumber = req.get('conta');

    const account = await accountsModel.findOne({
      agencia: agency,
      conta: accountNumber,
    });

    if (account && account.balance >= withdrawValue + 1) {
      account.balance -= withdrawValue + 1;

      await account.updateOne({ balance: account.balance }, { new: true });

      res.status(200).send({ balance: account.balance });
    } else {
      res
        .status(404)
        .send({ error: 'Account not found or insufficient balance!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Withdraw error!' });
  }
});

app.get('/accounts/balance', async (req, res) => {
  try {
    const agency = req.get('agencia');
    const accountNumber = req.get('conta');

    const account = await accountsModel.findOne({
      agencia: agency,
      conta: accountNumber,
    });

    if (account) {
      res.status(200).send({ balance: account.balance });
    } else {
      res.status(404).send({ error: 'Account not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Balance error!' });
  }
});

app.delete('/accounts/remove', async (req, res) => {
  try {
    const agency = req.get('agencia');
    const accountNumber = req.get('conta');

    const account = await accountsModel.findOneAndDelete({
      agencia: agency,
      conta: accountNumber,
    });

    if (account) {
      const agencyAccounts = await accountsModel.find({ agencia: agency });

      res.status(200).send(agencyAccounts);
    } else {
      res.status(404).send({ error: 'Account not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Remove error!' });
  }
});

app.put('/accounts/transfer', async (req, res) => {
  try {
    const { transferValue } = req.body;

    const sourceAccountNumber = req.get('contaOrigem');
    const destinationAccountNumber = req.get('contaDestino');

    const sourceAccount = await accountsModel.findOne({
      conta: sourceAccountNumber,
    });

    const destinationAccount = await accountsModel.findOne({
      conta: destinationAccountNumber,
    });

    if (sourceAccount && destinationAccount) {
      if (sourceAccount.agencia === destinationAccount.agencia) {
        sourceAccount.balance -= transferValue;
        destinationAccount.balance += transferValue;
      } else {
        sourceAccount.balance -= transferValue + 8;
        destinationAccount.balance += transferValue;
      }

      await sourceAccount.update(
        { balance: sourceAccount.balance },
        { new: true }
      );

      await destinationAccount.update(
        { balance: destinationAccount.balance },
        { new: true }
      );

      res.status(200).send({ balance: sourceAccount.balance });
    } else {
      res.status(404).send({ error: 'Account not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Withdraw error!' });
  }
});

app.get('/accounts/averageBalance', async (req, res) => {
  try {
    const agency = req.get('agencia');

    const accounts = await accountsModel.find({
      agencia: agency,
    });

    if (accounts.length > 0) {
      const averageBalance =
        accounts.reduce((acc, curr) => {
          return curr.balance + acc;
        }, 0) / accounts.length;

      res.status(200).send({ averageBalance });
    } else {
      res.status(404).send({ error: 'Agency not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Average Balance error!' });
  }
});

app.get('/accounts/poorest', async (req, res) => {
  try {
    const { numberOfAccounts } = req.body;

    const accounts = await (await accountsModel.find({}))
      .sort((a, b) => {
        return a.balance - b.balance;
      })
      .slice(0, numberOfAccounts);

    if (accounts.length > 0) {
      res.status(200).send(accounts);
    } else {
      res.status(404).send({ error: 'Accounts not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Poorest accounts error!' });
  }
});

app.get('/accounts/richest', async (req, res) => {
  try {
    const { numberOfAccounts } = req.body;

    const accounts = await (await accountsModel.find({}))
      .sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
      .sort((a, b) => {
        return b.balance - a.balance;
      })
      .slice(0, numberOfAccounts);

    if (accounts.length > 0) {
      res.status(200).send(accounts);
    } else {
      res.status(404).send({ error: 'Accounts not found!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Richest accounts error!' });
  }
});

app.put('/accounts/agencyTransfer', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ error: 'Withdraw error!' });
  }
});

export { app as accountsRouter };
