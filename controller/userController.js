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

const orderItems = async (req, res) => {
  try {
    const seller_id = req.headers["x-access-token"];
    const data = await Order.find({ seller_id });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const orderItem = async (req, res) => {
  try {
    const seller_id = req.headers["x-access-token"];
    const id = req.params.id;
    const data = await Order.find({ id });
  } catch (error) {
    console.log(error);
  }
};

export { login, orderItems, orderItem };
