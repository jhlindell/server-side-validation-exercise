'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
// const ev = require('express-validation');
// const validations = require('../validations/users');

router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  let firstName = req.body.users.firstName;
  let lastName = req.body.users.lastName;
  let username = req.body.users.username;
  let email = req.body.users.email;
  let phone = req.body.users.phone;

  if(!firstName || firstName.trim() === '') {
    const err = new Error('First name must not be blank');
    err.status = 400;
    return next(err);
  }

  if(!lastName || lastName.trim() === '') {
    const err = new Error('Last name must not be blank');
    err.status = 400;
    return next(err);
  }

  if(username.search(/[.,#!$%&*;:{}=\-_`~()]/) > 0){
    const err = new Error('Username cannot contain punctuation');
    err.status = 400;
    return next(err);
  }
  if(username.charAt(0) !== /^[A-Za-z][A-Za-z0-9]+$/){
    const err = new Error('must begin with a letter');
    err.status = 400;
    return next(err);
  }
  if(username.length < 6) {
  const err = new Error('Username must be at least 6 characters');
  err.status = 400;
  return next(err);
  }

  validateEmail(address){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(address);
  }

  if(email){
    if(validateEmail(email)){
    } else {
      const err = new Error('Username must be at least 6 characters');
      err.status = 400;
      return next(err);
    }
  }

  if(phone){
    if(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(phone)){

    } else {
      const err = new Error('Username must be at least 6 characters');
      err.status = 400;
      return next(err);
    }
  }


  knex('users')
    .insert({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      phone: phone
    })
    .returning(['firstname', 'lastname', 'username','phone','email'])
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
