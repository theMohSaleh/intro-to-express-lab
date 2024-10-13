const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.get('/greetings/:name', (reg, res) => {
    res.send(`Hello there, ${reg.params.name}`);
});