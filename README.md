🚀 GrowthX Assignment API 🌟
🌐 Live Demo: GrowthX API on Render
📄 API Documentation: Postman Documentation

📖 Overview
Welcome to the GrowthX Assignment API! This backend API is built using Node.js and Express.js, with security and performance in mind. From handling user and admin registrations to managing assignments, everything is secured and optimized with the best practices. 💡

🔒 Key Features:
🔑 JWT Authentication: Secure login for users and admins.
🍪 Secure Cookies: Handling sensitive data with secure cookies.
🔐 Password Encryption: Protect user passwords with bcryptjs.
🛡️ Rate Limiting: Protect against abuse with request limits.
🧼 XSS Protection: Mitigate cross-site scripting (XSS) with xss-clean.
🪖 Helmet: Secure HTTP headers for your app.
💾 MongoDB: Efficient database storage with Mongoose.
🔧 Technologies Used
🟢 Node.js
🧳 Express.js
📦 MongoDB with Mongoose
🛠️ JWT (JSON Web Tokens)
🔑 Bcrypt.js for Password Hashing
🚦 Express Rate Limiter
🔨 XSS-Clean
🪖 Helmet
🍪 Cookie Management
👤 User Endpoints
Method	Endpoint	Description
POST	/register	🚀 Register a new user by providing name, email, and password.
POST	/login	🔑 Login with email and password to receive an authentication token.
POST	/upload	📄 Upload an assignment for a specific admin. Requires authentication token.
GET	/admins	👨‍💼 Fetch all available admins. Requires authentication token.
👨‍💼 Admin Endpoints
Method	Endpoint	Description
POST	/register	🛡️ Register a new admin account with name, email, and password.
POST	/login	🔑 Admin login with email and password to receive a JWT token.
GET	/assignments	📝 View all assignments uploaded by users. Requires authentication token.
POST	/assignments/:id/accept	✔️ Accept an assignment (status set to accepted). Requires token.
POST	/assignments/:id/reject	❌ Reject an assignment (status set to rejected). Requires token.
🔒 Security Best Practices Implemented
🔐 JWT Tokens are used for secure authentication.
🍪 Secure Cookies with httpOnly, sameSite, and secure flags to prevent tampering.
🛡️ Rate Limiting to prevent request spamming and abuse.
🧼 XSS Protection using xss-clean to sanitize user input.
🪖 Helmet to secure HTTP headers.
🔑 bcrypt.js to securely hash passwords before saving to the database.
📄 API Documentation
For detailed API documentation and usage, check out the Postman Documentation:
📄 Postman API Documentation

📦 Installation & Setup
Clone the repository:

bash
Copy code
git clone https://github.com/maruti-panchal/GrowthX-Assignment.git
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

bash
Copy code
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
Start the server:

bash
Copy code
npm start
🚀 Deployment
This API is deployed on Render for easy access and testing:
🌐 GrowthX API on Render

🎯 Accomplishments
✅ JWT Authentication for secure user and admin access.
✅ User and Admin Registration/Login features.
✅ Upload & Manage Assignments for admins.
✅ Security Best Practices with XSS Protection, Secure Cookies, and Helmet.
✅ Postman Documentation for easy API access and testing.
📝 Tasks Accomplished
 Secure Authentication: Implemented JWT tokens and cookies for enhanced security.
 User/Admin Registration: Separate routes for user and admin registration/login.
 Assignment Management: Users can upload assignments, and admins can accept or reject them.
 Security Features: Implemented express-rate-limit, XSS protection, and password encryption.
 Postman Documentation: Complete API documentation is available on Postman.
📧 Contact
For any issues or queries, feel free to open an issue on GitHub or reach out via LinkedIn.

