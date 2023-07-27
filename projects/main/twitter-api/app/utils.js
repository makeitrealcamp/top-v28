import { configuration } from './config.js';

const { order, pagination } = configuration;

export const parsePaginationParams = ({
  limit = pagination.limit,
  offset = pagination.offset,
}) => ({
  limit: !Number.isNaN(Number.parseInt(limit))
    ? Number.parseInt(limit)
    : pagination.limit,
  offset: !Number.isNaN(Number.parseInt(offset))
    ? Number.parseInt(offset)
    : pagination.offset,
});

export const parseOrderParams = ({
  fields = [],
  orderBy = order.orderBy,
  direction = order.direction,
}) => ({
  orderBy: fields.includes(orderBy) ? orderBy : order.orderBy,
  direction: order.options.includes(direction) ? direction : order.direction,
});
