import Fastify from 'fastify';
import renderErrors from './routes/render-errors';
import dbConnector from './plugins/db-connector';
import 'dotenv/config';

const port = process.env.PORT as unknown as number;

const fastify = Fastify({
  logger: false,
});

fastify.register(dbConnector);
fastify.register(renderErrors);

const start = async () => {
  try {
    await fastify.listen({ port: port });
    console.log(`start on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
