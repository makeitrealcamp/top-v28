export const create = (req, res) => {
  res.status(201);
  res.json({
    data: body,
  });
};

export const all = (req, res) => {
  res.json({
    data: [],
  });
};

export const read = (req, res) => {
  res.json({
    data: {},
  });
};

export const update = (req, res) => {
  res.json({
    data: {},
  });
};

export const remove = (req, res) => {
  res.status(204);
  res.end();
};
