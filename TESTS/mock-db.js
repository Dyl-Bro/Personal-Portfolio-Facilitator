const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const {seedData} = require('./seedData');
const { MongoMemoryServerStates } = require('mongodb-memory-server-core/lib/MongoMemoryServer');

const mongoServer = new MongoMemoryServer();

 module.exports.dbconnect = async () => {
     if( mongoServer.state !== MongoMemoryServerStates.running){
        await mongoServer.start();
     }
    const mongoUri = mongoServer.getUri();
    const mongooseOptions = {
         useNewUrlParser: true,//avoid deprecation warning
         useUnifiedTopology: true //avoid deprecation warning
    };
    mongoose.connect(mongoUri, mongooseOptions,  (err) => {
      if(err) console.log(err);
    });
    seedData();
};

module.exports.dbclose = async () => {
    await mongoose.connection.dropDatabase();//deletes database
    await mongoose.connection.close();
    await mongoServer.stop();//terminates server
};

module.exports.dbclear = async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections) {
        await collections[key].deleteMany({});
    }
};