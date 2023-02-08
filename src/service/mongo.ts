import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const url = process.env.SERVER + process.env.DATABASE;
    await mongoose.connect(url, {});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
