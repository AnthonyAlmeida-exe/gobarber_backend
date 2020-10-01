import { Router, request } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

import ensureAuhtneticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuhtneticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateAvatarUserService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  },
);

export default usersRouter;
