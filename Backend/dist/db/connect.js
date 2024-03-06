import { connect, disconnect } from "mongoose";
const url = process.env.MONGODB_URL;
const connectToMongoDb = async () => {
    if (!url) {
        throw new Error("MongoDB URL is not defined.");
    }
    try {
        await connect(url);
        console.log("Connection to MongoDB successful.");
    }
    catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
};
const Disconnect = async () => {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB.");
    }
    catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        throw new Error("Could not disconnect from MongoDB.");
    }
};
export { connectToMongoDb, Disconnect };
//# sourceMappingURL=connect.js.map