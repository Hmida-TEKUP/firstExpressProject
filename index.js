const express = require('express');

const app = express();
const port  = process.env.PORT || 3000;

app.use(express.json());
// Like a DB
let students = [
    {id: 1, name: 'student1', age: 22},
    {id: 2, name: 'student2', age: 24},
    {id: 3, name: 'student3', age: 18}
];

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.get('/api/students/id/:iden', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.iden));
    if(!student) return res.status(404).send(`Student not found with this id ${req.params.iden}`);
    res.send(student);
});

app.post('/api/students', (req,res)=>{
    let student = {
        id: students[students.length-1].id+1,
        name: req.body.name,
        age: req.body.age
    };
    students.push(student);
    res.status(201).send(student);
});

app.listen(port, () => console.log(`Listening on ${port}....`));