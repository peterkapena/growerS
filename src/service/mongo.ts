import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const url = process.env.SERVER + process.env.DATABASE;
    // console.log(url);
    await mongoose.connect(url, { dbName: "grower_management" });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
