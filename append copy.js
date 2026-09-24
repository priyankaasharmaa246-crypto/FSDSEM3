const fs=require('fs');
//DELETE
fs.unlink('example.txt',(err)=>{
    if(err) throw err;
    console.log('File deleted!');
});