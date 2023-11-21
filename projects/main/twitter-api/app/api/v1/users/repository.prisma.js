import { prisma } from "../../../database.js";


export const createUser = async (data, password) => {
    return await prisma.user.create({
        data: {
            ...data,
            password,
        },
        select: {
            email: true,
        },
    });
}