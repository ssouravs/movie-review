import express, {Request,Response} from 'express';
import cors from "cors"
import { PrismaClient } from '@prisma/client';
import movieRoutes from './routes/movieRoutes'
import reviewRoutes from './routes/reviewRoutes'

const prisma=new PrismaClient();
const app=express();
const PORT=process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.get('/test',(req:Request,res:Response)=>{
    res.send("Hi Wlcome to this movie review portal")
})

app.use('/movies',movieRoutes)
app.use('/reviews',reviewRoutes)

app.listen(PORT,()=>{
    console.log('Server is up and running at port: ',PORT);
})