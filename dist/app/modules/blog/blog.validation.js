"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
// Define the blog shcema
const createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required'),
        content: zod_1.z.string().nonempty('Content is required'),
        author: zod_1.z.string().nonempty('Author is required'),
        isPublished: zod_1.z.boolean().optional().default(true),
    }),
});
const updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required').optional(),
        content: zod_1.z.string().nonempty('Content is required').optional(),
        author: zod_1.z.string().nonempty('Author is required').optional(),
        isPublished: zod_1.z.boolean().optional().default(true).optional(),
    }),
});
exports.BlogValidation = {
    createBlogSchema,
    updateBlogSchema,
};
