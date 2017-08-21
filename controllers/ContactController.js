'use strict';

const repository = require('../repositories/contact-repository');
const authRepository = require('../repositories/auth-repository');
const Validator = require('../validators/fluent-validator');
const authService = require('../services/auth-service');

exports.index = async (req, res, next) => {
    try {
        var token = req.headers['x-access-token'];
        var userdata = await authService.decodeToken(token);
        var user = await authRepository.getById(userdata.id);

        var data = await repository.getContacts(user._id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
}

exports.create = async (req, res, next) => {
    var token = req.headers['x-access-token'];
    var data = await authService.decodeToken(token);
    var user = await authRepository.getById(data.id);

    var contract = new Validator();
    contract.isPhoneFormat(req.body.phone, 'Not allowed letters on phone field.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        let contact = await repository.create({
            image: req.body.image,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            user: user._id
        });
        res.status(200).send({
            message: 'User created!'
        });
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}

exports.update = async (req, res, next) => {
    var contract = new Validator();
    contract.isPhoneFormat(req.body.phone, 'Not allowed letters on phone field.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        var contact = await repository.update(req.params.id, {
            image: req.body.image,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email
        });
        res.status(200).send({
            message: 'Update success!'
        });
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}