import { prisma } from "../lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface getUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  private static generateHash(salt: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  public static decodeJWTToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  public static getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  }

  public static async getUserToken(payload: getUserTokenPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User not found with this email");

    const userSalt = user.salt;
    const hashedPassword = UserService.generateHash(userSalt, password);

    if (hashedPassword !== user.password) throw new Error("Wrong password...");

    const jwtPayload = { id: user.id, email: user.email };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    return token;
  }
}

export default UserService;
