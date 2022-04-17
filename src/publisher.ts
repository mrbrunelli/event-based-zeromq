import * as zmq from "zeromq"
import fastify from "fastify"

const app = fastify({ logger: true })
const sock = new zmq.Publisher()

app.post<{ Body: { message: string } }>(
  "/news",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          message: {
            type: "string"
          }
        },
        required: ["message"]
      }
    }
  },
  async (request, reply) => {
    try {
      const msg = request.body.message

      app.log.info(`Received message: ${msg}`)

      await sock.send(["news", msg])

      return reply.status(200).send({
        message: "Successfully sent message!",
        content: msg
      })
    } catch (e: any) {
      return reply.status(400).send({
        message: e.message
      })
    }
  }
)

const start = async () => {
  try {
    await sock.bind("tcp://127.0.0.1:3000")
    await app.listen(3333)
  } catch (e) {
    app.log.error(e)
    process.exit(1)
  }
}

start()
