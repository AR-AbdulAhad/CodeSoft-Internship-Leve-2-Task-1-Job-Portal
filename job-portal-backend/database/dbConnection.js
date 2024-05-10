import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "jobPortalWebApplication",
    })
    .then(() => {
      console.log("Database Successfully Connected!");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
