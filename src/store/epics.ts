import { combineEpics } from 'redux-most';

import { epics as userEpic } from '../modules/user/actions';
import { epics as homeEpic } from '../modules/home/actions';

export default combineEpics([
  ...userEpic,
  ...homeEpic,
]);