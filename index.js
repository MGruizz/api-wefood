const Joi = require('joi');
const express = require('express');
const app = express();
const pool = require('./src/configs/db.config')


app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.get('/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('the course with the given ID was not found');
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('the course with the given ID was not found');

    const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object( {
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.delete('/api/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('the course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));



// client.connect();
// pool.query('select * from usuario', (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     } else {
//         console.log(res.rows)
//     }
//     pool.end();
// })
//pool.query('Insert into usuario(nombreusuario,contrasena,nombrepersona,descripcionusuario,redessociales,fotoperfil) values(\'Ardnas\',\'12345\',\'Fronten\',\'Chica electronica\',\'Linkdin\',\'fotito\')');

