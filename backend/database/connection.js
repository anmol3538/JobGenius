import mongoose from "mongoose";
const connection = () => {
    mongoose.connect(process.env.MONGO_URL,  {
        dbName : "JOB_PORTAL_WITH_AUTOMATION"
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log(`${err}`);
    })
}
export default connection;