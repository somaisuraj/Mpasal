const mongoose = require('mongoose');
let itemSchema = new mongoose.Schema({
  name: {
    type: String;
    requo
  },
  description:{

  }
});
let Item = mongoose.model('item', itemSchema);
