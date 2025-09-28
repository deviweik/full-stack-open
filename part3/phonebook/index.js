const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json());
app.use(express.static('dist'))


const persons = [
    { 
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    { 
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    { 
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    { 
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/info', (req, res) => {
    const response = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `;
    res.status(200).send(response);
})

app.get('/api/persons', (req, res) => {
    if (persons.length === 0) {
        return res.status(404).json({ error: 'No persons found' });
    }

    res.status(200).json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (!person) {
        return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(person);
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const index = persons.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }
    persons.splice(index, 1);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }
    const existingPerson = persons.find(p => p.name === name);
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
    }
    const newPerson = {
        id: (Math.random() * 10000).toFixed(0),
        name,
        number
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})