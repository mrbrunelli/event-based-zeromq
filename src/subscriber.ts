import * as zmq from "zeromq"

const run = async () => {
  const sock = new zmq.Subscriber()

  sock.connect("tcp://127.0.0.1:3000")
  sock.subscribe("news")
  console.log("Subscriber connected to port 3000")

  for await (const [topic, msg] of sock) {
    console.log(
      "Receive a message related to:",
      topic.toString(),
      "containing message:",
      msg.toString()
    )
  }
}

run()
