const express = require ("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const fs = require('fs');
//const {parseddata} = require('./textparse.js');
const {readFileSync, promises:fsPromises} = require('fs');
const app = express();  



app.use("/", express.static("public")); //launch app
app.use(fileUpload());// upload file button


//app.use(express.json);
app.post("/extract-text", (req,res) => {

    //if request files or pdf files dont exist, end
    if (!req.files && !req.files.pdfFile){ 
        res.status(400);
        res.end();
    }

    // Parse pdf(library), send result text
    pdfParse(req.files.pdfFile).then( result =>{ 
        fs.writeFile('./public/test.txt', result.text, err =>{
            if(err){
                console.error;
            }
            
        })
        res.send(result.text);
    })
});

app.get("/parse-json", (req, res)=> {
    const promise = ReadFile('./public/jsontest.json');
    promise.then(value =>{
        const data = value;
       // console.log(data);
        res.send(data)
    }).catch(err =>{        
        console.log(err);
})    


    
})
async function ReadFile(filename){
    try{
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const arr = contents.split("2019 American Camping Association, Inc. November 2019");///\r?\n/

      // console.log(arr);

        return  arr;

    } catch (err){
        console.log(err);
    }
}

app.listen(3000);