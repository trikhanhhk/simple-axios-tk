import { jwtDecode, JwtPayload } from "jwt-decode";
import { isLogin, refreshTokenExpired } from "./example/Service";

/**
 * This function is firstly used to register `interval` and check expire `token` 
 */
export const startCheckingTokenExpiration = async () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (accessToken && refreshToken) {
    await checkTokenExpiration(accessToken, refreshToken);
  }

  /**
   * This `interval` is used to check the time to expire `token`, it will call one time per minute
   * you can change the interval between calls
   */
  setInterval(async () => {
    const accessToken = 'Your token'             //localStorage.getItem('access_token');
    const refreshToken = 'Your refresh token'    // localStorage.getItem('refresh_token');
    if (isLogin() && accessToken && refreshToken) {
      await checkTokenExpiration(accessToken, refreshToken);
    }
  }, 1 * 60 * 1000);
};

/**
 * This function is used to check expired token, in this case if `exp` < 5 minute then the call will be made api to server to get a new token
 * @param accessToken the token use to auth
 * @param refreshToken then token use to get new accessToken
 */
const checkTokenExpiration = async (accessToken: string, refreshToken: string) => {
  const decodedToken = jwtDecode(accessToken) as JwtPayload;
  try {
    if (decodedToken && decodedToken.exp) {
      const exp = decodedToken.exp;
      const currentTime = Date.now();
      const expirationTime = exp * 1000;
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining <= 5 * 60 * 1000) {
        await refreshTokenFunction(refreshToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshTokenFunction = async (currentRefreshToken: string) => {
  const res = await refreshTokenExpired(currentRefreshToken); //call api to refresh token

  if (!res) return;

//   handle when you have new token, this example is the case you use `local storage` to stored your token

//   const { accessToken, refreshToken, userData } = res.data;
//   localStorage.setItem('access_token', accessToken);
//   localStorage.setItem('refresh_token', refreshToken);
//   localStorage.setItem("userData", JSON.stringify(userData));
};