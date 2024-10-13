const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.get('/greetings/:name', (reg, res) => {
    res.send(`Hello there, ${reg.params.name}`);
});

app.get('/roll/:number', (reg, res) => {
    let num = reg.params.number;
    let responseMsg;

    if (!isNaN(reg.params.number)) {
        num++; // make sure the maximum number can be rolled
        responseMsg = `You rolled a ${Math.floor(Math.random() * num)}.`;
    } else {
        responseMsg = 'You must specify a number.';
    }

    res.send(responseMsg);
});

app.get('/collectibles/:index', (reg, res) => {
    let responseMsg;
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    const item = collectibles[reg.params.index];

    if (item) {
        responseMsg = `So, you want the ${item.name}? For ${item.price}, it can be yours!`;
    } else {
        responseMsg = 'This item is not yet in stock. Check back soon!';
    }

    res.send(responseMsg);
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

app.get('/shoes', (reg, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    let returnData = [];

    const min = reg.query.min;
    const max = reg.query.max;
    const type = reg.query.type;

    returnData = shoes;

    if (!min && !max && !type) {
        returnData = shoes;
    } else {
        returnData.forEach((shoe, index) => {
            if (shoe.price < min) {
                returnData.splice(index, 1)
            }
            if (shoe.price > max) {
                returnData.splice(index, 1)
            }
            if (shoe.type !== type) {
                returnData.splice(index, 1)
            }
        });
    }

    res.send(returnData);
});