const { Schema, model,} = require('mongoose');



const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use an email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
);

//set virtual for friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  const User = model('User', UserSchema);

  module.exports = User;