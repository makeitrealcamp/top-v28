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

export const findUser = async (email) => {

    return await prisma.user.findUnique({
        where: {
            email,
            active: false, // TODO: change to true
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            password: true,
            profilePhoto: true,
        },
    });
};