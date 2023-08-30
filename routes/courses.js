const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id: 1, name: 'Introduction to Programming'},
    { id: 2, name: 'Python Programming'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given ID was not found');
    res.send(course);
});

router.post('/', (req, res) => {
    const validation = (validateCourse(req.body));
    console.log(req.body);
    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    console.log(course)

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with given ID was not found');

    const validation = validateCourse(req.body);
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course){
    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);
}

module.exports = router;
