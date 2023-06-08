import { verify } from "jsonwebtoken";
import Seller from "../model/seller.js";

const config = process.env;

const verifyUser = (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    return res
      .status(403)
      .send("Please pass in a valid seller user name as token");
  }

  const seller = req.headers.authorization.split(" ")[1];

  if (!seller) {
    return res.status(403).send("A seller id is required for authentication");
  }
  try {
    const confirmed = Seller.findOne({ seller });
    if (!confirmed) {
      return res.status(401).send("Invalid Seller");
    }
  } catch (err) {
    return res.status(401).send("Invalid Seller");
  }
  return next();
};

export default verifyUser;
