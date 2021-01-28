const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//check this to get working?
router.route('/:userId').post(addThought);

//get all thoughts
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeReaction)
//find single thought 
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);




module.exports = router;