import express, { request, text } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


let submitSchema = new mongoose.Schema({
firstNameText:  {type:String, Required:true},
lastNameText:   {type:String, Required:true},
ageText:        {type:Number, Required:true},
destinationText:{type:String, Required:true},
priceText:      {type:Number, Required:true},
membersText:    {type:Number, Required:true},
emailText:      {type:String, Required:true},
contactText:    {type:Number, Required:true},
// travelTypeText: {type:String, Required:true},
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
submitModel.create({
    
    firstNameText:  req.body.firstNameText,  
    lastNameText:   req.body.lastNameText,   
    ageText:        req.body.ageText,        
    destinationText:req.body.destinationText,
    priceText:      req.body.priceText,      
    membersText:    req.body.membersText,    
    emailText:      req.body.emailText,      
    contactText:    req.body.contactText,    
    // travelTypeText: req.body.travelTypeText, 
},(err,saved)=>{
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