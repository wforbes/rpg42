import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

io.on('connection', (socket) => {
	console.log('a user connected!', socket.id);
});

io.on('disconnect', (socket) => {
	console.log('a user disconnected');
});

server.listen(3001, () => {
	console.log('Server is running on port 3001');
})