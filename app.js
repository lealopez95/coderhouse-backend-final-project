import express from 'express';
import path from 'path';
import appRouter from './src/routers/app.routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/', appRouter);

app.listen(PORT, () => {
    console.log('Server on listening http://localhost:8080')
});


