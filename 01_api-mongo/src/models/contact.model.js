// contact-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'contact';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    //o nome será feito de forma aninhada.
    name: { 
      first: { 
        type: String,
        required: [true, 'First name is required']
      },
      last: {
        type: String,
        required: false
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phone:{
      type: String,
      required: [true, 'Phone number is required']
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
