export const PUBLIC_URL = 'https://zilpay.io/api/v1';
export const LOCAL_URL = 'http://127.0.0.1:5000/api/v1';

export function getAPI(isServer: boolean) {
  if (isServer) {
    return LOCAL_URL;
  }

  return URL;
}
