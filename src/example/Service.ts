import { httpClient } from "../httpClient";

export const refreshTokenExpired = async (your_refresh_token: string) => {
    return (await httpClient()).post(`your api refresh`, { your_key_refresh: your_refresh_token });
}

export const isLogin = () => {
    //Your logic check login
    //You can return a boolean

    return true;
    //or return false
}

//and other functions
//You can divide it into different parts

//AuthService.ts
export const login = async (loginData: {username: string, password: string}) => {
    return (await httpClient()).post(`your api login`, loginData);
}

//when you want upload file
//UserService.ts
export const uploadAvatar = async (avatar: FormData) => {
    //this config to upload file
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

    return (await httpClient()).post(`Your api update avatar`, avatar, config);
}

//and you can use with any method: get, put, patch, delete: example for user...
/**
 * await httpClient()).get("/users") -> to get list user (if you have this api)
 * 
 * await httpClient()).get("/users/${userId}") -> get one user
 * 
 * await httpClient()).put(/users/${userId}, userData: UserData) -> to edit
 * 
 * await httpClient()).delete(/users/${userId}) -> delete user
 * 
 */


/**
 * 
 * you can use at any your component to call api 
 * 
        * useEffect(() => {
            const fetchData = async () => {
                const response = await login({username: "username", password: "password"});
                if (!response) {
                    return;
                }
                const user = response.data.data;
                //handle;
            }
            
            fetchData();
        }, []);
 * 
 */