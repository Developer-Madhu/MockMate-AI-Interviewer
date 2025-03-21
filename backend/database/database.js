const mongoose = require("mongoose") 

const ConnectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/mockmate")
        console.log('\nMongoDB Connected !')
    }catch(er){
        console.log("MongDB Connection Failed!")
        console.error(er)
        process.exit(1)
    }
}
module.exports = ConnectDB