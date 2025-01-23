# Blogging Backend Platform

This is a NOQL blog backend project. I used **Typescript**, **Node.js**, **Express.js** and **MongoDB** or **Mongoose** in this project. Where user can write, update, and delete their blogs. The system incorporates role-based access control with two primary roles: **Admin** and **User**. It provides a secure and feature-rich API for managing blogs while ensuring user authentication and data integrity.

## Project Feature

This is a NSQL blogging backend platform. The database is designed to accommodate flexibility, scalability, and support for a variety of features such as blogging backend platform, where users and admin can register and login then user write, update, and delete their blogs.

**1. User Authentication**
- Secure user registration and login using JWT.
- Passwords are hashed using industry-standard algorithms for added security.
- Session management with token expiration to ensure secure access.

**2. Role-Based Access Control**
- **Admin Role:**
    - Manage user accounts (view, update, and delete users).
    - View, delete any blog in the system.
- **User Role:**
    - Perform full CRUD operations on their own blogs.
    - Access restricted to only their own data, ensuring privacy.

**3. Blog Management**
  - **Users can**
      - Create new blogs with titles, content.
      - Update existing blogs they own.
      - Delete blogs they own.
  - **Admins can manage blogs created by any user.**

**4. Public API for Blogs**
- Publicly accessible endpoints to view blogs without authentication.
- Search blogs by title, author name, or tags.
- Sort blogs based on creation date, popularity, or other criteria.
- Filter blogs by specific attributes, such as tags or date ranges.

## Installation

Follow these steps to set up the project locally:
- **TypeScript** : [Install here](https://www.typescriptlang.org/download/)
- **Node.js** : (v20.18.0) [Download here](https://nodejs.org/en/download/package-manager)
- **Express.js** : [Install here](https://expressjs.com/en/starter/installing.html)
- **Mongoose** : [Install here](https://mongoosejs.com/docs/index.html)
- **MongoDB**: 
-  **Cors** : [Install here](https://www.npmjs.com/package/cors)
-  **Dotenv** : [Install here](https://www.npmjs.com/package/dotenv)

---
