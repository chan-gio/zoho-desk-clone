export function successResponse({
  data = null,
  message = 'Request was successful.',
  statusCode = 200
}: {
  data?: any;
  message?: string;
  statusCode?: number;
}) {
  return {
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse({
  error,
  message = 'An error occurred.',
  statusCode = 500
}: {
  error: any;
  message?: string;
  statusCode?: number;
}) {
  return {
    success: false,
    statusCode,
    message,
    error,
    timestamp: new Date().toISOString(),
  };
} 