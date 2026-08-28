const express = require('express');
const app = express();

app.use(express.json());

// صفحة رئيسية للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// مسار التحقق واستقبال الـ Webhook
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // الرمز الذي أضفته في متغيرات البيئة على Railway وفي فيسبوك
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log(JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
