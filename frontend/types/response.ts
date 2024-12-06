export type TLoginResponse<T extends boolean> = {
  success: T;
  message: string;
  data: T extends true
    ? {
        user: {
          id: string;
          email: string;
          accessToken: string;
          refreshToken: string;
        };
      }
    : never;
  errors: T extends false
    ? {
        formErrors: [];
        fieldErrors: {
          email: string[];
        };
      }
    : never;
};
