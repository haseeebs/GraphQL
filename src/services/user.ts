import { prisma } from "../lib/database";
import bcrypt from 'bcrypt';

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

class UserService {

    public static createUser(payload: CreateUserPayload) {

        const {firstName, lastName, email, password} = payload;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        return prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        })

    }

};

export default UserService;