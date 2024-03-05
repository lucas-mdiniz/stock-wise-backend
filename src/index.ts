import { ExpressServer } from "./infra/ExpressServer";
import { MongoDbConnection } from "./infra/MongoDbConnection";

new MongoDbConnection().connect(process.env.DB_URI ? process.env.DB_URI : '')
  .then(() => new ExpressServer().start(process.env.PORT ? parseInt(process.env.PORT) : 3000))
  .catch(() => {
    console.log('Erro ao iniciar servidor');
    process.exit(1)});