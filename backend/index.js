import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res)=>{
    res.send('Hello From Backend')
})

const startServer = () =>{

    try {
        let port = 8080;
        connectDb(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`Server is Running at the port http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }

}


startServer()