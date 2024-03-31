const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: String,
  email: String,
  lastname: String,
  reports:[],
  uimg: {
    type: String,
    default: 'https://res.cloudinary.com/ddaxprhmz/image/upload/v1711874996/default-avatar-icon-of-social-media-user-vector_kvjdig.jpg'
  },
password: String,

});

module.exports = User = mongoose.model('User', UserSchema);
