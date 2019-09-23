"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Migrations = artifacts.require("Migrations");
module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
