import Order from "../model/order.js";

const orderItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const seller_id = req.headers.authorization.split(" ")[1];
    const data = await Order.find({ seller_id })
      .sort({ price: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return res.status(200).json({
      data,
      total: await Order.count(),
      limit,
      offset: page,
    });
  } catch (error) {
    console.log(error);
  }
};
const orderItem = async (req, res) => {
  try {
    const order_id = req.params.id;
    const data = await Order.findOne({ order_id }).sort({ price: 1 });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export { orderItems, orderItem };
