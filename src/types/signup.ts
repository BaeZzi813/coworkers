export type SignUpErrorResponseData = {
  message?: string;
  details?: Record<string, { message?: string; value?: string }>;
  email?: string | { message?: string };
};

export type SignUpErrorResponse = {
  response?: {
    status?: number;
    data?: SignUpErrorResponseData;
  };
};
