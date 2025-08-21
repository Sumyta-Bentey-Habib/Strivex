import{MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

export default function dbconnect(collectionname){
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_NAME).collection(collectionname)

}
