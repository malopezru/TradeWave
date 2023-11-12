"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getMe = exports.loginUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.findAll();
    res.json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.User.findByPk(id);
    if (!user)
        res.status(404).json('User does not exist');
    res.json(user);
});
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("helou");
    const { body } = req;
    const salt = yield bcrypt_1.default.genSalt(10);
    const password = yield bcrypt_1.default.hash(req.body.password, salt);
    const user = yield User_1.User.findOne({
        where: {
            email: body.email
        }
    });
    if (user)
        return res.status(400).jsonp('User already exists');
    const newUser = User_1.User.build(Object.assign(Object.assign({}, body), { password: password }));
    yield newUser.save();
    res.json(newUser);
});
exports.postUser = postUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const user = yield User_1.User.findOne({
        where: {
            email: body.email
        }
    });
    if (!user)
        return res.status(400).jsonp('User not exists');
    const isPasswordCorrect = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
        return res.status(400).jsonp('Incorrect Password');
    const token = jsonwebtoken_1.default.sign({ user }, 'secret_key');
    res.json({ token: token });
});
exports.loginUser = loginUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        const user = yield jsonwebtoken_1.default.verify(authorization, 'secret_key');
        res.json(user.user);
    }
    catch (error) {
        res.status(400).jsonp('Not valid Token');
    }
});
exports.getMe = getMe;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    let user = yield User_1.User.findOne({
        where: {
            email: body.email
        }
    });
    if (user)
        return res.status(400).jsonp('User already exists');
    user = yield User_1.User.findByPk(id);
    if (!user)
        return res.status(400).jsonp('User id does not exist');
    yield user.update(body);
    res.json(user);
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.User.findByPk(id);
    if (!user)
        return res.status(400).jsonp('User id does not exist');
    yield user.destroy();
    res.json(user);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=User.js.map