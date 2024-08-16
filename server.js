const express = require('express');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(bodyParser.json());

// Use wallet routes
app.use('/wallet', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
