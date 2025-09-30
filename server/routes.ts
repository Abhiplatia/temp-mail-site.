import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve static HTML files from public directory BEFORE Vite catches them
  app.get("/*.html", async (req, res, next) => {
    const htmlFile = path.basename(req.path);
    const htmlPath = path.resolve(import.meta.dirname, "..", "public", htmlFile);
    
    if (fs.existsSync(htmlPath)) {
      try {
        const content = await fs.promises.readFile(htmlPath, "utf-8");
        res.set("Content-Type", "text/html").send(content);
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
