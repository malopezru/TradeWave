"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const User_1 = require("../controller/User");
exports.router = (0, express_1.Router)();
exports.router.get('/', User_1.getUsers);
exports.router.get('/:id', User_1.getUserById);
exports.router.post('/register', User_1.postUser);
exports.router.post('/login', User_1.loginUser);
exports.router.post('/getMe', User_1.getMe);
exports.router.put('/:id', User_1.putUser);
exports.router.delete('/:id', User_1.deleteUser);
//# sourceMappingURL=User.js.map