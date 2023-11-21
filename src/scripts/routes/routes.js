import Detail from '../view/pages/detail';
import Like from '../view/pages/like';
import Main from '../view/pages/main';

const routes = {
  '/': Main,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
