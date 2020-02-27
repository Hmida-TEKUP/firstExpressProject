const express = require('express');
const Joi = require('joi');
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

let path_id_validator = {
    id : Joi.number().positive().required()
}
app.get('/api/students/id/:id', (req,res)=>{
    let validate_res = Joi.validate(req.params,path_id_validator);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send(`Student not found with this id ${req.params.id}`);
    res.send(student);
});

let path_name_validator = {
    name : Joi.string().min(3).max(12).required()
}
app.get('/api/students/name/:name', (req,res)=>{
    let validate_res = Joi.validate(req.params,path_name_validator);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    let student = students.find(s => s.name === req.params.name);
    if(!student) return res.status(404).send(`Student not found with this id ${req.params.name}`);
    res.send(student);
});

let student_validator_schema = {
    name : Joi.string().min(3).max(12).required(),
    age : Joi.number().positive().required()
}

app.post('/api/students', (req,res)=>{
    let validate_res = Joi.validate(req.body,student_validator_schema);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    let student = {
        id: students[students.length-1].id+1,
        name: req.body.name,
        age: req.body.age
    };
    students.push(student);
    res.status(201).send(student);
});

app.delete('/api/students/id/:id', (req,res)=>{
    let validate_res = Joi.validate(req.params,path_id_validator);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send(`Student not found with this id ${req.params.id}`);
    students = students.filter(s => s.id !== parseInt(req.params.id));
    
    res.send(student);
});

app.put('/api/students/id/:id', (req,res)=>{
    let validate_res = Joi.validate(req.params,path_id_validator);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send(`Student not found with this id ${req.params.id}`);
    validate_res = Joi.validate(req.body,student_validator_schema);
    if(validate_res.error)
        return res.status(400).send(validate_res.error.details[0].message);
    student.name = req.body.name;
    student.age = req.body.age;
    res.send(student);
});

app.listen(port, () => console.log(`Listening on ${port}....`));