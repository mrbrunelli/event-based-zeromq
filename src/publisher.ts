import * as zmq from "zeromq"

const run = async () => {
  const sock = new zmq.Publisher()

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Publish bound to port 3000")

  while (true) {
    console.log("Sending a multipart message envelope")
    await sock.send([
      "news",
      "Urgente! Dólar cai para R$1,00 e desenvolvedores ficam pobres."
    ])
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

run()
