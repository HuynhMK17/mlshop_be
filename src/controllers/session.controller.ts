import { Request, Response } from 'express';
//import redisClient from '../configs/redisClient';
import { ISessionController } from './interface/i.session.controller';
import { sendKafkaMessage ,trackingTopic } from '../configs/kafkaClient';
const SESSION_TTL_SECONDS = 1 * 60 * 60; // 1 hour TTL
const MAX_SESSION_LENGTH = 50; // Keep last 50 interactions

class SessionsController
   implements ISessionController
{
  
   async trackUserEvent(req: Request, res: Response) {
    try {
      const { sessionId, event, productId, timestamp } = req.body;
  
      if (!sessionId || !event || !productId) {
            return res.status(400).json({ message: "Missing required tracking data" });
      }
    
      const redisKey = `session:${sessionId}`; 
    
      // 1. Update Redis Session (Fire-and-forget style for speed)
      // const updateRedis = async () => {
      //   try {
      //     const pipeline = redisClient.pipeline();
      //     // Add item to the beginning of the list
      //     pipeline.lpush(redisKey, productId);
      //     // Trim the list to keep only the latest MAX_SESSION_LENGTH items
      //     pipeline.ltrim(redisKey, 0, MAX_SESSION_LENGTH - 1);
      //     // Reset the TTL on every interaction
      //     pipeline.expire(redisKey, SESSION_TTL_SECONDS);
      //     await pipeline.exec();
      //     // console.log(`[Redis] Updated session ${sessionId}`);
      //   } catch (error) {
      //     console.error(`[Redis] Error updating session ${sessionId}:`, error);
      //   }
      // };
      // updateRedis(); // Don't await this for faster response
    
      // 2. Send Event to Kafka (Asynchronous)
      const eventData = {
        sessionId,
        event,
        productId,
        // userId, // Include if available
        timestamp,
        // ... add any other relevant context from req.body or headers
      };
      sendKafkaMessage(trackingTopic, eventData); // Fire-and-forget
    
      // 3. Send Response to Frontend
      return res.status(200).json({ message: 'Tracked' });
    } catch (err) {
      console.error('Track API error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export const sessionsController = new SessionsController();
