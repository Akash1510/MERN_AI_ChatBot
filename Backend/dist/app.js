import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routers/v1.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bodyParser from 'body-parser';
config();
const app = express();
//middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
//use cookie parser which directly give to backend to frontend
app.use(cookieParser(process.env.COOKIE_SECRET));
//for mail middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//remove it in the production
app.use(morgan('dev'));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map