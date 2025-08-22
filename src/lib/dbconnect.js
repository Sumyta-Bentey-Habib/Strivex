import{MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

export default async  function dbconnect(collectionname){
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  await client.connect();
return client.db(process.env.DB_NAME).collection(collectionname)

}