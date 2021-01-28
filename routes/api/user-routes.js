const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

//Get all users and create user
router
.route('/')
.get(getUsers)
.post(createUser);
//Get single user by id, update and delete user
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);
//Find friends of users
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;