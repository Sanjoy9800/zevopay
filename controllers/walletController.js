const WalletModel = require('../models/walletModel');

const WalletController = {
    getBalance: (req, res) => {
        const memberID = req.query.memberID;
        WalletModel.getBalance(memberID, (err, balance) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(balance);
        });
    },

    addMoney: (req, res) => {
        const { memberID, amount } = req.body;
        WalletModel.addMoney(memberID, amount, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Money added successfully', results });
        });
    },

    getTransactions: (req, res) => {
        const memberID = req.query.memberID;
        const filters = {
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            search: req.query.search,
            limit: parseInt(req.query.limit) || 10,
            offset: parseInt(req.query.offset) || 0
        };

        WalletModel.getTransactions(memberID, filters, (err, transactions) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(transactions);
        });
    },

    exportReport: (req, res) => {
        
        res.json({ message: 'Export functionality not implemented yet.' });
    }
};

module.exports = WalletController;
