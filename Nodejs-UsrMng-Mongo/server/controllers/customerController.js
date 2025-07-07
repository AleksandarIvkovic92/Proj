const Customer = require("../models/Customer");
const mongoose = require("mongoose");

/**
 * GET /api/customers
 * Get all customers with pagination
 */
exports.getAllCustomers = async (req, res) => {
  let perPage = 12;
  let page = parseInt(req.query.page) || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec();

    const count = await Customer.countDocuments({});
    res.json({
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * GET /api/customers/:id
 * Get single customer by ID
 */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * POST /api/customers
 * Create new customer
 */
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      details: req.body.details,
      tel: req.body.tel,
      email: req.body.email,
    });

    const saved = await newCustomer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

/**
 * PUT /api/customers/:id
 * Update customer
 */
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

/**
 * DELETE /api/customers/:id
 * Delete customer
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * POST /api/customers/search
 * Search customers by first or last name or email
 */
exports.searchCustomers = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm || "";
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
