const {User, Thought} = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //find single user by id
    getSingleUser({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .populate({
            path: 'friends',
            select: '-__v'
        })
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
        User.create(body)
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
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        
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