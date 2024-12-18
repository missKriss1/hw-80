import express from 'express';
import cors from 'cors';
import categoryRouter from "./routes/categories";
import categoryDb from "./categoryDb";
import locationRouter from "./routes/locations";
import locationDb from "./locationDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/categories', categoryRouter);
app.use('/places', locationRouter);

const run = async () => {
    await categoryDb.init();
    await locationDb.init();
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);