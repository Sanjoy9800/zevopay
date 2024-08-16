const db = require('../config/db');

const WalletModel = {
    getBalance: (memberID, callback) => {
        const query = 'SELECT * FROM users WHERE memberID = ?';
        db.query(query, [memberID], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    addMoney: (memberID, amount, callback) => {
        const query = 'UPDATE users SET balance = balance + ? WHERE memberID = ?';
        db.query(query, [amount, memberID], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getTransactions: (memberID, filters, callback) => {
        let query = 'SELECT * FROM transactions WHERE memberID = ?';
        const params = [memberID];

        if (filters.startDate && filters.endDate) {
            query += ' AND date BETWEEN ? AND ?';
            params.push(filters.startDate, filters.endDate);
        }

        if (filters.search) {
            query += ' AND (narration LIKE ? OR transactionID LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
        params.push(filters.limit, filters.offset);

        db.query(query, params, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    createTransaction: (transactionData, callback) => {
        const query = 'INSERT INTO transactions SET ?';
        db.query(query, transactionData, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = WalletModel;
