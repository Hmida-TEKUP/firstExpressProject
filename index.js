const express = require('express');

const app = express();
// Like a DB
let students = [
    {id: 1, name: 'student1', age: 22},
    {id: 2, name: 'student2', age: 24},
    {id: 3, name: 'student3', age: 18}
];

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.listen(3000, () => console.log(`Listening on 3000....`));