import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;



// import mongoose from "mongoose";

// const cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

// const connectDb = async () => {
//   const MONGO_URI = process.env.MONGO_URI;
//   if (!MONGO_URI) {
//     throw new Error("MONGO_URI environment variable is not defined.");
//   }

//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGO_URI, {
//       bufferCommands: false,
//     }).then((mongooseInstance) => {
//       console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
//       return mongooseInstance;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default connectDb;
