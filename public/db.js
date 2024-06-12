const mongoose = require('mongoose');

mongoose.promise=global.promise;
export const connect = () => mongoose.connect('mongodb://localhost:27017')

/