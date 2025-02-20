const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (data) => {
        let messageData = JSON.parse(data);

        // Broadcast message to all users
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    username: messageData.username,
                    message: messageData.message
                }));
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

server.listen(3000, () => console.log('WebSocket server running on port 3000'));
