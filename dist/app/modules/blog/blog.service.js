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
exports.BlogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const blog_model_1 = require("./blog.model");
const mongoose_1 = __importDefault(require("mongoose"));
const blog_const_1 = require("./blog.const");
const createBlogIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = payload;
    const result = yield blog_model_1.Blog.create({ title, content, author: userId });
    return result;
});
//get single blog from db
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id).populate('author', 'name email');
    if (!blog) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not Found');
    }
    return blog;
});
// get all blog from db
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const search = query.search || '';
    const excludingQuery = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludingQuery.forEach((key) => delete queryObj[key]);
    // User search with query to find blog posts
    const searchQuery = blog_model_1.Blog.find({
        $or: blog_const_1.searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        })),
    });
    // Sorting data
    let sortString;
    if ((query === null || query === void 0 ? void 0 : query.sortBy) && (query === null || query === void 0 ? void 0 : query.sortOrder)) {
        const sortBy = query.sortBy;
        const sortOrder = query.sortOrder === 'desc' ? '-' : '';
        sortString = `${sortOrder}${sortBy}`;
    }
    const sortQuery = sortString ? searchQuery.sort(sortString) : searchQuery;
    //filtering data with author Id
    if (query.filter) {
        sortQuery.find({
            author: new mongoose_1.default.Types.ObjectId(query.filter),
        });
    }
    // Fetching the final result
    const result = yield sortQuery
        .find(queryObj)
        .populate('author', 'name email');
    return result;
});
//update blog info into db
const updateBlogIntoDB = (userId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = payload;
    const blog = yield blog_model_1.Blog.findOneAndUpdate({ _id: id, author: userId }, { title, content }, { new: true });
    if (!blog) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found or you are not the author');
    }
    return blog;
});
//delete data from db
const deleteBlogFromDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findOneAndDelete({ _id: id, author: userId });
    if (!blog) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return blog;
});
exports.BlogService = {
    createBlogIntoDB,
    getSingleBlogFromDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
};
