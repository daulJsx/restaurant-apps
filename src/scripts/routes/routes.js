import Detail from '../view/pages/detail';
import Favorite from '../view/pages/favorite';
import Main from '../view/pages/main';

const routes = {
  '/': Main,
  '/detail/:id': Detail,
  '/liked-heaven': Favorite,
};

export default routes;
