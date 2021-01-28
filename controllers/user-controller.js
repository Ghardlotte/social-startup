const {User, Thought} = require('../models');

const userController = {
    //get all users
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //find single user by id
    getSingleUser(req,res) {
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message:'Could not find user'});
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //create user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }); 

    },
    //update by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No user found'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //delete user and thoughts
    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.userId}
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'User Not Found'})
            }

            return Thought.deleteMany({_id: { $in: dbUserData.thoughts}});
        })
        .then(() => {
            res.json({message: 'Thoughts and User Information deleted'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //add new friend
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, { $addToSet: {friends: req.params.friendId}}, {new: true})
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No User Found'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(err);
        });
    },
    //delete friend
    removeFriend(req, res) {
        User.findOneAndUpdate({_id:req.params.userId}, { $pull: {friends: req.params.friendId}}, {new:true})
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: "No User Found"});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;