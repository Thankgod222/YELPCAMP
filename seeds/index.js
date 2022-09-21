const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers'); 
const Campground = require('../models/campground');
// const { fileLoader } = require('ejs');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
    useNewUrlParser: true, 
    // useCreateIndex: true, 
    useUnifiedTopology: true 
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('DATABASE CONNECTED');
});
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
   const random1000 = Math.floor(Math.random() * 1000);
   const price = Math.floor(Math.random() * 20) + 10;
   const camp = new Campground({
          //  YOUR USER ID
         author:  '629afbaa4322b4ec48bb3422',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sapiente deleniti neque. Blanditiis debitis optio ullam voluptatem dolore fuga pariatur doloremque vitae accusamus quam provident, quo quae ad consectetur eligendi.', 
            price,
            geometry: {  
               type : "Point", 
               coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/thankgod222/image/upload/v1655456731/YelpCamp/ecylrrvyvymprlsa6uj5.jpg',
                  filename: 'YelpCamp/ecylrrvyvymprlsa6uj5',
                },
                {
                  url: 'https://res.cloudinary.com/thankgod222/image/upload/v1655456732/YelpCamp/yu4isscn5kvcq3ay3ayk.jpg',
                  filename: 'YelpCamp/yu4isscn5kvcq3ay3ayk',
                }
              ]
   })
   await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
