const conf = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DATABASE: process.env.MONGO_URI,
};

export default (): any => conf;
