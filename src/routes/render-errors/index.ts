import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function routes(fastify: FastifyInstance, options: any) {
  const collection = fastify.mongo.db?.collection('render-error');
  fastify.get(
    '/render-errors',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await collection?.find().toArray();
      return result;
    }
  );

  const renderErrorJsonSchema = {
    type: 'object',
    required: ['name', 'message', 'stack'],
    properties: {
      name: { type: 'string' },
      message: { type: 'string' },
      stack: { type: 'string' },
    },
  } as const;

  const schema = {
    body: renderErrorJsonSchema,
  };

  fastify.post('/render-errors', { schema }, async (request, reply) => {
    const dataWithTimestamp = {
      //@ts-ignore
      ...request.body,
      createdAt: new Date(),
    };

    const result = await collection?.insertOne(dataWithTimestamp);
    return result;
  });
}
