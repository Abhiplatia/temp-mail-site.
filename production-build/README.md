# QuickTempMail.live - Production Build

## Deployment Instructions for Hostinger

### Requirements
- Node.js 18+ on your hosting server
- Environment variables setup

### Setup Steps

1. **Upload Files**: Upload all files to your Hostinger hosting directory

2. **Install Dependencies**: 
   ```bash
   npm install --production
   ```

3. **Environment Variables**: 
   Create a `.env` file with:
   ```
   NODE_ENV=production
   PORT=3000
   SESSION_SECRET=your-secret-key-here
   ```

4. **Start Application**:
   ```bash
   npm start
   ```

### File Structure
- `public/` - Static frontend files (HTML, CSS, JS)
- `index.js` - Built server file
- `package.json` - Dependencies and scripts

### Notes
- The app runs on port 3000 by default
- Make sure your Hostinger plan supports Node.js applications
- Configure your domain to point to the application port

### Frontend Only Option
If you only want to host the frontend (static files), you can just upload the contents of the `public/` folder to your web hosting directory.