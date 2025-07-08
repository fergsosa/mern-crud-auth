export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return (
      res
        .status(400)
        // .json({ message: error })
        // .json({ error: error.errors.map((error) => error.message) })
        .json(error.errors.map((error) => error.message))
      //* .json({ message: error.errors.map((error) => error.message) })
    );
  }
};
