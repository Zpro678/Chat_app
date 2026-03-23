const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // Quan trọng: Dùng Number để mapping với ID của Oracle
    conversation_id: { 
      type: Number, 
      required: true,
      index: true 
    },
    sender_id: { 
      type: Number, 
      required: true 
    },
    type: { 
      type: String, 
      enum: ['text', 'image', 'file', 'system_event', 'call_log'], 
      required: true 
    },
    content: { 
      type: String, 
      default: "" 
    },
    media_attachments: [
      {
        url: String,
        size: Number,
        format: String
      }
    ],
    read_by: [
      {
        // Đồng bộ với ID Oracle
        user_id: { type: Number, required: true },
        read_at: { type: Date, default: Date.now }
      }
    ],
    created_at: { 
      type: Date, 
      default: Date.now 
    }
  }
);

// Tối ưu Hiệu năng (Level 4): Compound Index giúp phân trang siêu tốc theo thời gian
messageSchema.index({ conversation_id: 1, created_at: -1 });

module.exports = mongoose.model('Message', messageSchema);