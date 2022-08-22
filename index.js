
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors')

app.use(express.json())

app.use(cors())

morgan.token('request_body', function getRequestData(req) {
    const body = req.body;
    if (body) {
        return JSON.stringify({ name: body.name, number: body.number });
    }
})

app.use(morgan('tiny'))
app.use(morgan(':method :url :response-time :request_body '))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(item => item.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(item => item.id !== id);

    response.status(204).end();
});


app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: `name missing `
        });
    }
    if (!body.number) {
        return response.status(400).json({
            error: `number missing `
        });
    }
    if (persons.find(item => item.name === body.name) !== undefined) {
        return response.status(400).json({
            error: `name must be unique `
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor((Math.random() * 100000000000) + 1),
    };

    persons = persons.concat(person);

    response.json(person);
});

app.get('/info', (request, response) => {
    response.send(`
    <div>
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>
    </div>
    `);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})