import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


let submitSchema = new mongoose.Schema({
text:{type:String, Required:true},
ClassId:String,
CreatedOn:{type:Date, default:Date.now},
});

const submitModel = mongoose.model('submit',submitSchema);

const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


//////////////////PUSH//////////////////////

app.post('/submit',(req,res)=>{

submitModel.create({text:req.body.text},(err,saved)=>{
    if(!err){

        console.log(saved);

        res.send({
            message:"your Data is Saved",
        })
    }else{
        res.status(500).send({

            message:"Server Error"
        })
    }
})

});


app.listen(port, () => {

    console.log(`${port}`)
})

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://admin:admin@cluster0.nglzhki.mongodb.net/admindatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});