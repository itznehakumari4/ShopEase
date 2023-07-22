import bcrypt from "bcryptjs";

const checkPassword = async (user, enteredPassword) => {
  // validates the password
  return await bcrypt.compare(enteredPassword, user.password);
};

export default checkPassword;
