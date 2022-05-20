import app from "./app";

const listenPort = process.env.PORT || process.env.APP_SERVER_PORT || 10000;
const appName = process.env.APP_NAME as string;

app.express.listen(listenPort, () => {
  console.log(`[${appName}] Server is running on port ${listenPort}!`);
});
