const fs=require('fs');
//CREATE
fs.writeFile('example.txt','I AM PRIYANKA SHARMA FROM ABES ENGINEERING COLLEGE CURRENTLY STUDYING IN CSE DS BRANCH ',(err)=>{
    if(err) throw err;
    console.log('File created');
    //READ
    fs.readFile('example.txt','utf8',(err,data)=>{
        console.log('File content:',data);
    });

});