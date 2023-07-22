import bcrypt from "bcryptjs";

const encryptPassword = async (enteredPassword) => {
  const saltRounds = 10; // Number of salt rounds to use for hashing

  try {
    const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
    return await bcrypt.hash(enteredPassword, salt); // Hash the password with the generated salt
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw new Error("Error encrypting password");
  }
};

export default encryptPassword;
