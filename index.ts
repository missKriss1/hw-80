import express from 'express';
import cors from 'cors';
import fs = require("fs");
import categoryRouter from "./routes/categories";
import categoryDb from "./categoryDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/categories', categoryRouter);

const run = async () => {
    if (fs.existsSync('./categories.json')) {
        await categoryDb.init();
    } else {
        fs.writeFileSync('./categories.json', JSON.stringify([]));
    }
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);