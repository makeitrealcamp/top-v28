import { prisma } from '../../database.js';

export async function create(req, res, next) {
  const { body = {}, auth = {} } = req;
  const { recipientId } = body;
  const { id: userId } = auth;

  try {
    const conversation = await prisma.conversation.create({
      data: {
        userAId: userId,
        userBId: recipientId,
      },
    });

    res.json(conversation);
  } catch (error) {
    next(error);
  }
}

export async function list(req, res, next) {
  const { auth = {} } = req;
  const { id: userId } = auth;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userAId: userId,
          },
          {
            userBId: userId,
          },
        ],
      },
      include: {
        userA: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        userB: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    const data = conversations.map((conversation) => {
      const user =
        conversation.userAId === userId
          ? conversation.userB
          : conversation.userA;
      return {
        ...user,
        id: conversation.id,
      };
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  const { params = {}, auth = {} } = req;
  const { id: conversationId } = params;
  const { id: userId } = auth;

  try {
    const conversations = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            id: Number(conversationId),
          },
          {
            OR: [
              {
                userAId: userId,
              },
              {
                userBId: userId,
              },
            ],
          },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
}
