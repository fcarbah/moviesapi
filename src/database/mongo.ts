import mongoose from "mongoose";
import config from "config";

export class Mongo {

    uri: string = config.get("mongodb.uri");

    async connect() {

        try {
            return await mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        }
        catch (error) {
            throw new Error('Error connecting to DB');
        }

    }

    async disconnect() {
        await mongoose.disconnect();
    }
}


export default new Mongo();