/*
File name: indext.js
Author's name: Sisi Li
Web site name: Sisi's Portfilo
File description: this is a index router file to create each GET, POST function
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the contact model
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

let sentences;
/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('content/index', {
    title: 'Home',
    name: 'SISI LI',
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
  sentences = ['Hi, My name is Sisi Li.',
    'I come from China and I am living in Canada for 3 years. I am currently studying software engineering technology at Centennial College.',
  ];
  res.render('content/about', {
    title: 'About',
    sentences: sentences,
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET projects page. */
router.get('/projects', (req, res, next) => {
  sentences = ['This is a sample of the projects that I have worked on in the last semester. ',
    'Most of this are android applications by using android studio and JavaEE websites which were developed based on MVC pattern.'];
  res.render('content/projects', {
    title: 'Projects',
    sentences: sentences,
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  let services = [
    { name: 'Android development', description: 'Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets. What I can provide is to develop android application by using different APIs such as animation and grphics, location with Google Play services, data storage(Preferences, SQLite databases, Cache files), Content Providers, networking and connectivity, send SMS and so on.' },
    { name: 'JavaEE development', description: 'Java EE is a widely used computing platform for enterprise software. Java EE extends the Java Platform, Standard Edition (Java SE), providing an API for object-relational mapping, distributed and multi-tier architectures, and web services. I can offer the services like persistence which contains the contracts between a persistence provider and the managed classes and the clients of the Java Persistence API (JPA). Also I provide services to build website based on Enterprise JavaBean(EJB) in order to provide transactions (using JTA), remote procedure calls (using RMI or RMI-IIOP), concurrency control, dependency injection and access control for business objects.' },
    { name: 'ASP.Net development', description: 'ASP.NET is an open-source server-side web application framework designed for web development to produce dynamic web pages. It was developed by Microsoft to allow programmers to build dynamic web sites, web applications and web services. I experienced a term project which was a simple e-commerce site by using ASP.Net within a team. I can offer the Entity Framwork, HTML, JavaScript services to build a great performance application or webiste based on ASP.Net freamwork.  ' },
    { name: 'SQL', description: 'SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). I can offer MySQL, Microsoft SQL Sever, and Oracle services to connect databases with various kinds of development tools or applications such as Eclipse, androis studio, visual studio and so on.' }
  ]
  sentences = ['Since I have been studying software engineering for 3 years, I can offer seversl services.',
    'The following are services that I can offer to you'];
  res.render('content/services', {
    title: 'Services',
    sentences: sentences,
    services: services,
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  sentences = ['If you have any concern or question, please feel free to contact me',
    'Email: sli167@my.centennialcollege.ca',
    'Phone: 416-833-2598'
  ];
  res.render('content/contact', {
    title: 'Contact',
    sentences: sentences,
    contacts: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

// GET /login - render the login view
router.get('/login', (req, res, next) => {
  // check to see if the user is not already logged in
  if (!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      contacts: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/contacts'); // redirect to business contacts page
  }
});

// POST /login - process the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/contacts',
  failureRedirect: '/login',
  failureFlash: 'bad login'
}));

// GET /register - render the registration view
router.get('/register', (req, res, next) => {
  // check to see if the user is not already logged in
  if (!req.user) {
    // render the registration page
    res.render('auth/register', {
      title: "Register",
      contacts: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/contacts'); // redirect to business contacts page
  }
});

// POST / register - process the registration submission
router.post('/register', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('Error inserting new user');
        if (err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          contacts: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/contacts');
      });
    });
});

// GET /logout - process the logout request
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); // redirect to the home page
});





module.exports = router;
