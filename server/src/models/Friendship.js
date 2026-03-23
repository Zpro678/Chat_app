const mongoose = require('mongoose');
const { Schema} = mongoose;

const friendshipSchema = new Schema({
    
        requester_id:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        recipient_id:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:{
            type:String,
            enum:['Pending','Accepted','Rejected'],
            default:'Pending'
        }
    }, {
        timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
});

// Lưu ý tối ưu: Đánh compound Index siêu tốc độ để tra cứu quan hệ 2 người
friendshipSchema.index({requester_id:1,recipient_id:1},{unique:true});

module.exports = mongoose.model('Friendship',friendshipSchema);
