import * as D from '../definitions';
import { fetchJson } from './utils';

const homeProducts = (): Promise<D.Product[]> => {
  return fetchJson('http://secondhand.leanapp.cn/products/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const buyProduct = (objectId: string): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/buy/${objectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'sessionToken': 'hnknhew0gglhe3uczxbvva4rf',
    },
  });
};

const boughtProductList = (user: D.User): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/bought/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'sessionToken': 'hnknhew0gglhe3uczxbvva4rf',
    },
  });
};

const ownProductList = (user: D.User): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/owned/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'sessionToken': 'hnknhew0gglhe3uczxbvva4rf',
    },
  });
};

export {
  homeProducts,
  buyProduct,
  boughtProductList,
  ownProductList,
}