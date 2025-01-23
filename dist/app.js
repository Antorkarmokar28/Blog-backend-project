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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blog_route_1 = require("./app/modules/blog/blog.route");
const globalErrorHandeling_1 = __importDefault(require("./app/middlewares/globalErrorHandeling"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const user_route_1 = require("./app/modules/user/user.route");
const admin_route_1 = require("./app/modules/admin/admin.route");
// import notFound from './app/middlewares/notFound';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const testServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        success: true,
        message: 'Server is runnig...',
    });
});
app.get('/', testServer);
app.use('/api/auth', auth_route_1.UserRegistrationRouter);
app.use('/api/auth', user_route_1.UserRoute);
app.use('/api', blog_route_1.BlogRoutes);
app.use('/api', admin_route_1.AdminActionRouter);
// global error route
app.use(globalErrorHandeling_1.default);
// any router not found handeler
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found',
    });
});
exports.default = app;
