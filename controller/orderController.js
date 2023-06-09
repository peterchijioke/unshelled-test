import Order from "../model/order.js";
import Product from "../model/product.js";

// Get pagginated order items
const orderItems = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    const seller_id = req.headers.authorization.split(" ")[1];
    const count = await Order.estimatedDocumentCount({ seller_id });
    const pageCount = count / limit;
    const query = await Order.find({ seller_id })
      .sort({ price: -1 })
      .limit(limit)
      .skip((Number(page) - 1) * Number(limit))
      .exec();
    const data = await Promise.all(
      query.map(async (item) => {
        const product = await Product.findOne({ product_id: item.product_id });
        return {
          id: item.order_item_id,
          product_id: item.product_id,
          product_category: product.product_category_name ?? null,
          price: item.price,
          date: item.shipping_limit_date,
        };
      })
    );

    return res.status(200).json({
      data,
      total: count,
      limit,
      offset: pageCount,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get single order item
const orderItem = async (req, res) => {
  try {
    const order_id = req.query.id;
    if (!order_id) {
      return res.status(400).json({ message: "order_id is required" });
    }
    const data = await Order.findOne({ order_id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// Delete an order Item

const deletOrderItem = async (req, res) => {
  try {
    const order_id = req.params.id;
    if (!order_id) {
      return res.status(400).json({ message: "order_id is required" });
    }
    const data = await Order.deleteOne({ order_id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export { orderItems, orderItem, deletOrderItem };
