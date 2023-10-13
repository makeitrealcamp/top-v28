import { prisma } from '../../database.js';

export async function create(req, res, next) {
  const { body = {}, auth = {} } = req;
  const { conversationId } = body;
  const { id: userId } = auth;

  try {
    const message = await prisma.message.create({
      data: {
        ...body,
        conversationId,
        userId,
      },
    });

    res.json(message);
  } catch (error) {
    next(error);
  }
}
