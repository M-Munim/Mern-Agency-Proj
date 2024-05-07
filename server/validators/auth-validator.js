const { z } = require("zod");

// Creating obj Schema
const signupSchema = z.object({
  username: z.string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars." })
    .max(255, { message: 'Name must be not more than 255 chars' }),

  email: z.string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be atleast of 5 chars." })
    .max(255, { message: 'Email must be not more than 255 chars' }),

  phone: z.string({ required_error: "Phone is Required" })
    .trim()
    .min(3, { message: "Phone must be atleast of 10 chars." })
    .max(255, { message: 'Phone must be not more than 20 chars' }),

  password: z.string({ required_error: "Password is Required" })
    .trim()
    .min(3, { message: "Password must be atleast of 8 chars." })
    .max(255, { message: 'Password must be not more than 20 chars' }),
});


module.exports = signupSchema