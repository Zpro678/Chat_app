const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema(
    {
        type:{
            type:String,
            enum:['private','group'],
            required:true
        },

        name:{
            type:String,
            default:null // chỉ có giá trị khi type là group

        },
        avatar_url:{
            type:String,
            default:null
        },
        members:[{
            type:Schema.Types.ObjectId,
            ref:'User',
            index:true // để query lấy danh sách group của 1 user
        }],
        // Tối ưu hóa hiệu năng: lưu trữ thừa, tin nhắn cuối
        last_message:{
            message_id:{
                type:Schema.Types.ObjectId,
                ref:'Message'
            },
            sender_id :{ type:Schema.Types.ObjectId,ref: 'User' },
            content:{ type:String},
            created_at:{ type: Date}
        }
    },
    {
        timestamps:{ cteatedAt: 'created_at', updatedAt:'updated_at'}
    }
);
module.exports = mongoose.model('Conversation',conversationSchema);