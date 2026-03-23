const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        conversation_id:{
            // Oracle conversation id (NUMBER)
            type: Number,
            required:true,
            index:true // để query tin nhắn của 1 cuộc trò chuyện

        },
    sender_id:{
        // Oracle user id (NUMBER)
        type: Number,
        required:true
    },
    type:
    {
        type:String,
        enum:['text', 'image','file','system', 'call_log'],
        required:true

    },
    
        content:{
            type:String,
            required:true,
        },
        media_attachments:[
            {
                url:String,
                size:Number,
                format:String
            }
        ],
        // phục vụ tính năng đã xem
        read_by:[{
            user_id:{ type: Number },
            read_at:{ type:Date, default: Date.now }
        }],

        created_at: { 
            type: Date, 
            default: Date.now 
          }
        });
        
        // LƯU Ý TỐI ƯU CẤP ĐỘ 4: Compound Index hỗ trợ phân trang (Load more messages)
        // Sắp xếp -1 (Descending) để luôn lấy tin nhắn mới nhất trước
        messageSchema.index({ conversation_id: 1, created_at: -1 });
        
        module.exports = mongoose.model('Message', messageSchema)
    

    
