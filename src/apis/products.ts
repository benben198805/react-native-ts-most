import * as D from '../definitions';
import { fetchJson } from './utils';

export const homeProducts = (): Promise<D.Product[]> => {
  return fetchJson('http://secondhand.leanapp.cn/products/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};