'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    name: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { type: String, select: true },
    role: {
        type: String,
        required: true,
        enum: ['client', 'admin'],
        trim: true
    }
},
{
    timestamps: { createdAt: 'created_at', updateAt: 'updated_at' }
})
//Encrypt Password
UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
});
//Encrypt Password if update it
UserSchema.pre('findOneAndUpdate', function (next) {
    if (this.getUpdate().password) {
        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(this.getUpdate().password, salt, null, (err, hash) => {
                if (err) return next(err)
                this.getUpdate().password = hash
                next()
            });
        });
    }
});

UserSchema.pre('findByIdAndUpdate', function (next) {
    if (this.getUpdate().password) {
        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(this.getUpdate().password, salt, null, (err, hash) => {
                if (err) return next(err)
                this.getUpdate().password = hash
                next()
            });
        });
    }
});

module.exports = mongosee.model('User', UserSchema)