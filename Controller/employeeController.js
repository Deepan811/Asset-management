const Employee = require('../models/employee');

exports.index = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.render('employee/index', { employees });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching employees.');
  }
};

exports.add = (req, res) => {
  res.render('employee/add');
};

exports.create = async (req, res) => {
  try {
    const { name, email, isActive } = req.body;
    const employee = await Employee.create({ name, email, isActive });
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating an employee.');
  }
};

exports.edit = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('employee/edit', { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching employee for editing.');
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email, isActive } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    employee.name = name;
    employee.email = email;
    employee.isActive = isActive;
    await employee.save();
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating employee.');
  }
};
