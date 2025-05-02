import { Kafka, logLevel } from "kafkajs";

const kafkaBrokers = (process.env.KAFKA_BROKERS || "localhost:9092").split(
  ","
);
const clientId = process.env.KAFKA_CLIENT_ID || "default-client";
export const trackingTopic =
  process.env.KAFKA_TRACKING_TOPIC || "tracking-events";

const kafka = new Kafka({
  clientId: clientId,
  brokers: kafkaBrokers,
  logLevel: logLevel.WARN, // Adjust as needed (INFO, DEBUG)
  retry: {
    initialRetryTime: 300,
    retries: 5,
  },
});

const producer = kafka.producer({
  allowAutoTopicCreation: true, // Convenient for dev, consider disabling in prod
});
// const consumer = kafka.consumer({ groupId: 'backend-consumer-group' }); // If backend needs to consume

const connectKafka = async () => {
  try {
    await producer.connect();
    console.log(`[Kafka] Producer connected to brokers: ${kafkaBrokers}`);
    // await consumer.connect();
    // await consumer.subscribe({ topic: 'some-other-topic', fromBeginning: true });
    // await consumer.run({ eachMessage: async ({ topic, partition, message }) => { /* ... */ } });
  } catch (error) {
    console.error("[Kafka] Failed to connect:", error);
    // Implement retry logic or shutdown gracefully
    setTimeout(connectKafka, 5000); // Simple retry
  }
};

// Call connectKafka when the application starts
// (e.g., in your main server file after initializing Express)

const sendKafkaMessage = async (topic: string, message: any) => {
  if (!producer.events.CONNECT) {
    console.warn("[Kafka] Producer not connected. Message not sent.");
    return; // Or queue the message
  }
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    // console.log(`[Kafka] Sent message to ${topic}:`, message); // Verbose logging
  } catch (error) {
    console.error(
      `[Kafka] Failed to send message to topic ${topic}:`,
      error
    );
  }
};

// Graceful shutdown
const disconnectKafka = async () => {
  try {
    await producer.disconnect();
    console.log("[Kafka] Producer disconnected.");
    // await consumer.disconnect();
  } catch (error) {
    console.error("[Kafka] Error disconnecting:", error);
  }
};

export { connectKafka, sendKafkaMessage, disconnectKafka /*, consumer */ };
