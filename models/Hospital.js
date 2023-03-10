const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    address:{
        type: String,
        require: [true, 'Please add an address'],
    },
    district:{
        type: String,
        require: [true, 'Please add a district'],
    },
    province:{
        type: String,
        require: [true, 'Please add a province'],
    },
    postalcode:{
        type: String,
        require: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal code cannot be more than 5 digits'],
    },
    tel:{
        type: String,
    },
    region:{
        type: String,
        require: [true, 'Please add a region'],
    },
});

module.exports = mongoose.model('hospital', hospitalSchema);