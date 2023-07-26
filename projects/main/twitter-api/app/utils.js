import { configuration } from './config.js';

const { pagination } = configuration;

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
