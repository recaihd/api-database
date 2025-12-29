import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// sexo
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI);

const Esquema = mongoose.model('Mensagens', {texto: String});

app.post('/enviar', async (req, res) => {
    try {
        await new Esquema({ texto: req.body.texto }).save();
res.json({ok: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.listen(process.env.PORT || 3000, () => console.log('api rodando em http:localhost:3000'))