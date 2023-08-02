//bcrypt is a library used for password hashing, which is a technique to securely store user passwords in a hashed format in the database.
import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10), //The second argument i.e, 10 in this case is saltrounds, higher the salt round higher the security but the computation time also increases
    //https://blog.logrocket.com/password-hashing-node-js-bcrypt/ , 10 is salt rounds...read the documentation for more info
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
