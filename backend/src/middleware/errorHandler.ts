import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: { statusCode: StatusCodes; message: any; errors: any; }, req: any, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; errors: any; }): any; new(): any; }; }; }, next: any) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // Development: show full stack for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("❌ ERROR:", err);
  }

  // Standardized error response
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
    errors: err.errors || null, // <-- Shows validation errors
  });
};
