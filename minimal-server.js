const express = require('express');

const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Minimal server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>MILESTONE 2</h1>
        <h2>Darkroom Gallery</h2>
        <p>Server is running successfully!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
    `);
});

const PORT = process.env.PORT || 3000;

console.log('Starting minimal server...');
console.log(`Port: ${PORT}`);

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is listening on port ${PORT}`);
    console.log(`✅ Server is accessible at http://0.0.0.0:${PORT}`);
    console.log('✅ Server started successfully!');
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
}); 