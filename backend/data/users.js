import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10), //https://blog.logrocket.com/password-hashing-node-js-bcrypt/ , 10 is salt rounds...read the documentation for more info
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10), //https://blog.logrocket.com/password-hashing-node-js-bcrypt/ , 10 is salt rounds...read the documentation for more info
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
