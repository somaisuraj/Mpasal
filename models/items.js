const mongoose = require('mongoose');
let ItemSchema = new mongoose.Schema({
  name: {
    type: String;
    required: true;
  },
  category:{
    type: String;
    required: true;
  }
});
let Item = mongoose.model('item', ItemSchema);
