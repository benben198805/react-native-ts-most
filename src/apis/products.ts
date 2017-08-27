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

const buyProduct = (objectId: string, sessionToken: string): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/buy/${objectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      sessionToken,
    },
  });
};

const boughtProductList = (user: D.User): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/bought/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      sessionToken: user.sessionToken,
    },
  });
};

const ownProductList = (user: D.User): Promise<D.BuyProductResponse> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/owned/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'sessionToken': user.sessionToken,
    },
  });
};

const uploadProductDetail = (product: D.UploadProduct, user: D.User): Promise<D.Product> => {
  return fetchJson(`http://secondhand.leanapp.cn/products/create/`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      'sessionToken': user.sessionToken,
    },
  });
};

const uploadImage = (image: D.UploadProductImage, user: D.User): Promise<any> => {
  const { sessionToken } = user;
  const uri = image.img;
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append('img', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  return fetchJson(`http://secondhand.leanapp.cn/products/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      sessionToken,
    },
  });

};

export {
  homeProducts,
  buyProduct,
  boughtProductList,
  ownProductList,
  uploadProductDetail,
  uploadImage,
}