"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// create user route
router.post('/blogs', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogSchema), blog_controller_1.BlogController.createBlog);
// get single blog
router.get('/blogs/:id', blog_controller_1.BlogController.getSingleBlog);
// get all blog
router.get('/blogs', blog_controller_1.BlogController.getAllBlog);
//update blog
router.patch('/blogs/:id', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogSchema), blog_controller_1.BlogController.updateBlog);
// delete blog
router.delete('/blogs/:id', (0, auth_1.default)('admin', 'user'), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
