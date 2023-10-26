const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const employeeRoutes = require('./routes/employees');
const scrapAssetRoutes = require('./routes/scrapAsset');
const issueAssetRoutes = require('./routes/issueAsset');
const returnAssetRoutes = require('./routes/returnAsset');
const stockRoutes = require('./routes/stock');
const categoryRoutes = require('./routes/assetCategory');

const Employee = require('./models/employee');
const HistoryEvent = require('./models/assetHis');
const AssetCategory = require('./models/AssetCategory');
const Asset = require('./models/Asset');
const sequelize = require('./database/connection');




// Set up Pug as the view engine
app.engine('pug',require('pug').renderFile);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for employee management

app.use('/employees', employeeRoutes);
app.use('/categories', categoryRoutes);
app.use('/stock', stockRoutes);
app.use('/return', returnAssetRoutes);
app.use('/issue', issueAssetRoutes);
app.use('/scrap', scrapAssetRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('layouts/layout', { title: 'Asset Management System' });
});
app.get('/list', (req, res) => {
  res.render('employee/list');
});


// View employee details
app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  // Use Sequelize to fetch the employee by ID
  Employee.findByPk(employeeId)
    .then((employee) => {
      if (employee) {
        res.render('view', { employee });
      } else {
        res.status(404).send('Employee not found');
      }
    })
    .catch((err) => {
      console.error('Error fetching employee:', err);
      res.status(500).send('Error fetching employee');
    });
});




app.get('/employees/new', (req, res) => {
  res.render('add');
});

app.post('/employees', (req, res) => {
    const { name, position } = req.body;
  
    // Use Sequelize to create a new employee
    Employee.create({
        name,
        position,
    })
      .then(() => {
        // Redirect to the employee list or a success page
        res.redirect('/employees');
      })
      .catch((err) => {
        console.error('Error adding a new employee:', err);
        // Render an error page or display an error message
        res.status(500).send('Error adding a new employee');
      });
  });
  
  
  // Edit employee details
  
    // Fetch the employee details using Sequelize and render edit-employee.pug
    app.get('/employees/:id/edit', (req, res) => {
        const employeeId = req.params.id;
      
        // Use Sequelize to fetch the employee by ID
        Employee.findByPk(employeeId)
          .then((employee) => {
            if (employee) {
              res.render('edit', { employee });
            } else {
              res.status(404).send('Employee not found');
            }
          })
          .catch((err) => {
            console.error('Error fetching employee for editing:', err);
            res.status(500).send('Error fetching employee for editing');
          });
      });
      

  
  // Handle form submission for editing an employee
  
    // Update the employee details using Sequelize
    // Redirect to the employee details page or the employee list
    app.post('/employees/:id', (req, res) => {
        const employeeId = req.params.id;
        const updatedEmployee = {
          name: req.body.name,
          position: req.body.position,
        };
      
        // Use Sequelize to update the employee by ID
        Employee.update(updatedEmployee, {
          where: { id: employeeId },
        })
          .then(() => {
            res.redirect(`/employees/${employeeId}`);
          })
          .catch((err) => {
            console.error('Error updating employee:', err);
            res.status(500).send('Error updating employee');
          });
      });
      
  
  
 
 
  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


