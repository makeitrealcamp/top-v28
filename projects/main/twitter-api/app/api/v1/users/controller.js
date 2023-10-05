import { prisma } from '../../../database.js';

export const account = async (req, res, next) => {
  const { body = {} } = req;
  const { sub } = body;

  try {
    await prisma.user.upsert({
      where: {
        sub,
      },
      create: {
        ...body,
      },
      update: {
        ...body,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
