import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import router from './routes/index';

const app: Application = express();

// middlewares
app.use( urlencoded({ extended: true }) );
app.use( json() );
app.use( cors() );

// routes
app.use( router );


export default app;