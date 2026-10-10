import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  // In build or development without env, provide a lazy error when accessed or fallback mock
  clientPromise = Promise.reject(new Error("Missing MONGODB_URI in environment variables."));
} else {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri!);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri!);
    clientPromise = client.connect();
  }
}

export default clientPromise;
