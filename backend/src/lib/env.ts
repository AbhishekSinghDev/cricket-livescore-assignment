type EnvType = {
  PORT: string;
  DB_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
};

const Env: { [key in keyof EnvType]?: string } = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

// Function to verify that all environment variables are present
export const verifyEnv = () => {
  Object.keys(Env).forEach((key) => {
    const value = Env[key as keyof EnvType];
    if (!value) {
      const msg = `[error]: ${key} environment variable missing.`;
      throw new Error(msg);
    }
  });

  console.log("[server]: Env check successful.");
};

export default Env as EnvType;
