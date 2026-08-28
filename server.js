const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
    res.status(200).send('Webhook is working!');
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log("تم استلام رسالة جديدة:", JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل على المنفذ ${PORT}`);
});