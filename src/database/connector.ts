import mongo from "./mongo";
import config from "config";
import mongoose from 'mongoose';


export default class DBConnector{

    protected static conn;

    public static async connect(){
        return await mongo.connect();
    }

    public static disconnect(){
        mongo.disconnect();
    }

    public static create(){
        if(!DBConnector.conn){
            DBConnector.conn = mongoose.createConnection(config.get('mongodb.uri'),{ useNewUrlParser: true, useUnifiedTopology: true });
        }
        return DBConnector.conn;
    }

}
