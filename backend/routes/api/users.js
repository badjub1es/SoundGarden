const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.put(
  '/',
  asyncHandler(async (req, res) => {
    // const { newPic } = req.body;
    const { newPic } = req.body;
    const { userId, imgUrl, bannerUrl } = newPic;
    const user = await User.findByPk(userId);
    if (imgUrl) {
      await user.update({
        imgUrl
      });
    }
    if (bannerUrl) {
      await user.update({
        bannerUrl
      });
    }
  })
)

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
  );

router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (user) {
      return res.json({ user })
    }

  })
)
module.exports = router;
