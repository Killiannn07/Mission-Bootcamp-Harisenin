import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "validation error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
