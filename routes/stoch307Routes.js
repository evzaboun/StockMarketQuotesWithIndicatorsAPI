const express = require('express');
const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');
const quotes = require('../server/services/quote.service');
const charMarkUtils = require('../server/common/charMarkUtils');
const stockSignalsUtils = require('../server/common/stockSignalsUtils');

let routes = function(){
    let stoch307Router = express.Router();
    let stoch307Controller = require('../controllers/stoch307SignalController')(
        axios,
        quotes,
        moment,
        _,
        charMarkUtils,
        stockSignalsUtils);

    stoch307Router.route('/stoch307bull')
        .get(stoch307Controller.getStoch307BullSignals);

    stoch307Router.route('/createstoch307bullsignalsallsymbols')
        .post(stoch307Controller.postStoch307BullSignalsForAllSymbols);

    stoch307Router.route('/bullwithfilter')
        .post(stoch307Controller.getStoch307BullSignalsWithFilter);

    return stoch307Router;
};

module.exports = routes;