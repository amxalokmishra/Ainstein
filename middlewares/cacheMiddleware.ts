import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

// Initialize cache with a standard TTL (Time To Live)
const cache = new NodeCache({ stdTTL: 100 });

// Extend the Express Response interface to include sendResponse
declare module "express-serve-static-core" {
  interface Response {
    sendResponse?: (body: any) => Response<any>;
  }
}

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // Backup original res.json method
  res.sendResponse = res.json.bind(res);

  // Override res.json to cache the response
  res.json = (body: any) => {
    cache.set(key, body);
    return res.sendResponse!(body);
  };

  next();
};
