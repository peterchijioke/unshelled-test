import Order from "../model/order.js";
import Product from "../model/product.js";

// Get pagginated order items
const orderItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const seller_id = req.headers.authorization.split(" ")[1];
    const query = await Order.find({ seller_id })
      .sort({ price: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const data = query.map(async (item) => {
      const product = await Product.findOne({ product_id: item.product_id });
      if (product.product_category_name) {
        return {
          id: item.order_item_id,
          product_id: item.product_id,
          product_category: product.product_category_name,
          price: item.price,
          date: item.shipping_limit_date,
        };
      }
      return {
        id: item.order_item_id,
        product_id: item.product_id,
        product_category: null,
        price: item.price,
        date: item.shipping_limit_date,
      };
    });
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
