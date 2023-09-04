import { configuration } from './config.ts';
import { OrderOptions } from './types.ts';

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
}: {
  fields: string[];
  orderBy: string;
  direction: OrderOptions.ASC | OrderOptions.DESC;
}) => ({
  orderBy: fields.includes(orderBy) ? orderBy : order.orderBy,
  direction: order.options.includes(direction) ? direction : order.direction,
});
