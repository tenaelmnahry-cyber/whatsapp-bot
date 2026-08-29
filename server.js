const express = require('express');
const app = express();

app.use(express.json());

// صفحة رئيسية للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// مسار التحقق واستقبال الـ Webhook
app.get('/webhook', (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }
    
    // يمنع ظهور خطأ Application failed to respond عند فتح الرابط يدوياً
    return res.status(200).send('Webhook is working!');
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log(JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});
