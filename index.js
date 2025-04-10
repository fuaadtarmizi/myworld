const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // allow frontend to connect
    // methods: ['GET', 'POST'],
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
