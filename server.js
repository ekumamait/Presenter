import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './app/routes/routes';
import connection from './app/connection';
import cors from 'cors';

dotenv.config();

var corsOptions = {
    origin: "http://localhost:8080"
};

const app = express();
app.use(cors(corsOptions))
const { PORT } = process.env;
const database_ip = process.env.IP;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

//Home route
app.get('/', (req, res) => {
    return res.status(200).send({
      status: 200,
      message: 'warming up at Port 5000'
    });
});

// wrong route
app.use((req, res) => res.status(405).send({
    'status': 405,
    'error': 'This URL does not exist'
}));

// server down
app.use((req, res) => res.status(500).send({
    'status': 500,
    'error': 'Oops! The problem is not on your side. Hang on, we will fix this soon'
}));

// current process environment
app.listen(PORT || 3000,
        console.log(`App listening on port ${PORT}!`),
        database_ip
    ); 

export default app;