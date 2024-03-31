const mongoose = require('mongoose');

const NursesSchema = new mongoose.Schema({
    name: String,
    specialty: String,
  lastname: String,
  location:String,
  coords:{},
password: String,
last_visit: String,
uimg:String

});

module.exports = Nurses = mongoose.model('Nurses', NursesSchema);
