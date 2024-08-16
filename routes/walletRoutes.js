const express = require('express');
const WalletController = require('../controllers/walletController');
const router = express.Router();

router.get('/balance', WalletController.getBalance);
router.post('/add-money', WalletController.addMoney);
router.get('/transactions', WalletController.getTransactions);
router.post('/export', WalletController.exportReport);

module.exports = router;
