import { prisma } from '../../database.js';
import client from '../../cache.js';

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

    const users = await client.hGetAll('users');
    const usersIds = Object.values(users).map((id) => Number(id));

    const data = conversations.map((conversation) => {
      const user =
        conversation.userAId === userId
          ? conversation.userB
          : conversation.userA;
      return {
        ...user,
        userId: user.id,
        online: usersIds.includes(user.id),
        id: conversation.id,
      };
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  const { params = {}, auth = {}, query = {} } = req;
  const { id: conversationId } = params;
  const { id: userId } = auth;
  const { skip = '0', limit = '100' } = query;

  try {
    const [conversations, total] = await Promise.all([
      prisma.conversation.findFirst({
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
        skip: Number(skip),
        take: Number(limit),
        include: {
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      }),
      prisma.message.count({
        where: {
          conversationId: Number(conversationId),
        },
      }),
    ]);

    res.json({
      ...conversations,
      limit: Number(limit),
      skip: Number(skip),
      total,
    });
  } catch (error) {
    next(error);
  }
}
