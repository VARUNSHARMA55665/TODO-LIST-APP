const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: {
        type: "String",
        required: "true"
    },
    category: {
        type: "String",
        required: "true"
    },
    due_date: {
        type: "string",
        required: "true"
    }
});

const task = mongoose.model('task',schema);

module.exports = task;