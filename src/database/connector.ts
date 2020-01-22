import mongo from "./mongo";


export default class DBConnector{

    public static async connect(){
        return await mongo.connect();
    }

    public static disconnect(){
        mongo.disconnect();
    }

}
