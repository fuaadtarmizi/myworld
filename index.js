const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: ['https://myworld-1c5cc.web.app'], // ✅ allow your Firebase frontend
  methods: ['GET', 'POST'],
  credentials: true
}))

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://myworld-1c5cc.web.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

// When a user connects
io.on('connection', (socket) => {
  console.log('🟢 user connected:', socket.id)

  // When a chat message is received
  socket.on('chat-message', (msg) => {
    console.log('chat masuk', msg)
    io.emit('chat-message', msg) // broadcast to all clients
  })

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`🚀 Server is running at on port ${PORT}`)
  
})

app.get('/', (req, res) => {
  res.send('🟢 Socket.io backend is running.')
})
