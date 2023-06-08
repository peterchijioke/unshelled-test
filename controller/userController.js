import Seller from "../model/seller.js";
export function home(req, res) {
  res.status(200).send("Welcome 🙌 ");
}
const login = async (req, res) => {
  try {
    // Get user input
    const { seller_id, seller_zip_code_prefix } = req.body;

    // Validate user input
    if (!seller_id && !seller_zip_code_prefix) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if seller exist
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

const orderItems = (req, res) => {};

export { login, orderItems };
