import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve attached_assets directory for images and static files with aggressive caching
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "attached_assets");
  app.use("/attached_assets", express.static(attachedAssetsPath, {
    maxAge: '1y', // Cache for 1 year
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filepath) => {
      // Add cache control headers for images
      if (filepath.endsWith('.jpg') || filepath.endsWith('.jpeg') || filepath.endsWith('.png') || filepath.endsWith('.webp') || filepath.endsWith('.svg')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  // Serve static HTML files from public directory BEFORE Vite catches them
  app.get("/*.html", async (req, res, next) => {
    const htmlFile = path.basename(req.path);
    const htmlPath = path.resolve(import.meta.dirname, "..", "public", htmlFile);
    
    if (fs.existsSync(htmlPath)) {
      try {
        const stats = await fs.promises.stat(htmlPath);
        const lastModified = stats.mtime.toUTCString();
        const etag = `"${stats.mtime.getTime()}-${stats.size}"`;
        
        // Check If-None-Match for conditional requests
        if (req.headers['if-none-match'] === etag) {
          res.status(304).end();
          return;
        }
        
        const content = await fs.promises.readFile(htmlPath, "utf-8");
        // Add proper caching headers for better performance
        res.set({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=300, must-revalidate", // 5 minutes cache with revalidation
          "ETag": etag,
          "Last-Modified": lastModified
        });
        res.send(content);
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
