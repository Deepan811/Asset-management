const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Import your Employee model

// Route to add a new employee (POST request)
router.post('/add', async (req, res) => {
  try {
    const { employeeName, /* other employee details */ } = req.body;
    const newEmployee = new Employee({
      name: employeeName,
      // Initialize other employee properties
    });
    await newEmployee.save();
    res.redirect('/employees');
  } catch (error) {
    console.error('Error adding employee:', error);
    // Handle error and render an error page if necessary
  }
});

// Route to render the form for editing an employee (GET request)
router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    // Render the 'edit-employee' Pug template with the employee data
    res.render('edit-employee', { employee });
  } catch (error) {
    console.error('Error retrieving employee for editing:', error);
    // Handle error and render an error page if necessary
  }
});

// Route to update an employee (POST request)
router.post('/update/:id', async (req, res) => {
  try {
    const { employeeName, /* other employee details */ } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    // Update employee properties and save to the database
    employee.name = employeeName;
    // Update other employee properties
    await employee.save();
    res.redirect('/employees');
  } catch (error) {
    console.error('Error updating employee:', error);
    // Handle error and render an error page if necessary
  }
});

// Route to view employees with filtering and searching (GET request)
router.get('/', async (req, res) => {
  try {
    const { statusFilter, search } = req.query;
    let query = {};
    if (statusFilter && statusFilter !== 'all') {
      query.status = statusFilter;
    }
    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }
    const employees = await Employee.find(query);
    // Render the 'employees' Pug template with the list of employees
    res.render('employees', { employees });
  } catch (error) {
    console.error('Error retrieving employees:', error);
    // Handle error and render an error page if necessary
  }
});

module.exports = router;
