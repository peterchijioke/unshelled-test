import Seller from "../model/seller.js";
import Order from "../model/order.js";
export function home(req, res) {
  res.status(200).send("Welcome 🙌 ");
}
const login = async (req, res) => {
  try {
    const { seller_id, seller_zip_code_prefix } = req.body;
    if (!seller_id && !seller_zip_code_prefix) {
      res.status(400).send("All input is required");
      return;
    }
    const seller = await Seller.findOne({ seller_id });
    if (seller && seller.seller_zip_code_prefix === seller_zip_code_prefix) {
      res.status(200).json(seller);
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const updateSellerDetails = async (req, res) => {
  const seller_id = req.headers.authorization.split(" ")[1];
  const { seller_city, seller_state } = req.body;
  const filter = { seller_id };
  const update = { seller_city, seller_state };
  try {
    const seller = await Seller.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    res.status(200).json(seller);
  } catch (error) {
    console.log(error);
  }
};

export { login, updateSellerDetails };
