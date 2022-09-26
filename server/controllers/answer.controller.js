const Answer = require("../model/answer.model");
const Question = require("../model/question.model");

//Create ANSWER Route
const createAnswer = async (req, res) => {
  const answer = new Answer();
  answer.text = req.body.text;
  answer.author = req.user;

  try {
    await answer.save().then(
      Question.findByIdAndUpdate(
        req.params.questionid,
        { $push: { answers: answer._id } },
        { new: true, useFindAndModify: false }
      ).exec((err, questionData) => {
        if (err) {
          console.error(err);
        } else {
          res.send(questionData);
        }
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

//FETCH Answers
const fetchAnswers = async (req, res) => {
  Answer.find()
    .populate("author", "_id")
    .exec((err, answers) => {
      if (err) {
        return res.status(400).send({ message: getErrorMessage(err) });
      } else {
        res.json(answers);
      }
    });
};

//Modify an Answer
const editAnswer = async (req, res) => {
  const answerid = req.params.answerid;
  const answer = new Answer();
  answer.text = req.body.text;

  try {
    await Answer.findByIdAndUpdate(
      answerid,
      { text: answer.text, isEdited: true },
      { new: true }
    ).exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        res.send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

//FETCH single answer
const fetchAnswer = async (req, res) => {
  const answerId = req.params.answerid;
  try {
    await Answer.findOne({ _id: answerId }).exec((err, answer) => {
      if (err) {
        return res.status(400).send({ message: getErrorMessage(err) });
      } else {
        res.json(answer);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//DELETE Answer
const deleteAnswer = async (req, res) => {
  answerId = req.params.answerId;
  questionId = req.params.questionId;
  try {
    await Answer.deleteOne({ _id: answerId }).then(
      Question.findByIdAndUpdate(
        questionId,
        { $pull: { answers: answerId } },
        { new: true, useFindAndModify: false }
      ).exec((err) => {
        if (err) {
          res.json({ succes: false, message: err });
        } else res.json({ success: true, message: "deleted successfully" });
      })
    );
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  createAnswer,
  fetchAnswers,
  editAnswer,
  fetchAnswer,
  deleteAnswer,
};
