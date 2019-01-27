import axios from 'axios'
import config from 'src/config/config'

interface IApiClientOptions {
    token: string;
    url: string;
}
export interface IAjaxResponse {
    data: {
        success: boolean,
        data: {
            auth_token?: string;
        }
    };
}
class ApiClient {
    public token: string = "";
    public url: string = "";
    constructor(options: IApiClientOptions) {
        this.token = options.token;
        this.url = options.url;
    }
    public async request(path: string, data: object): Promise<any> {
        try {
            if (this.token === null) {
                const storageToken: string | null = localStorage.getItem("TOKEN");
                if (storageToken !== null) {
                    this.updateToken(storageToken);
                }
            }
            const request = axios.post(this.url + path, { ...data, token: this.token });
            request.then((response: IAjaxResponse) => {
                const token = response.data.data.auth_token;
                if (token !== undefined && token !== null) {
                    this.updateToken(token);
                } else {
                    console.log("ERROR UPDATE TOKEN");
                }

            });
            return await request;

        } catch (e) {
            console.log(e);
            return undefined;
        }
    }
    private updateToken(token: string) {
        this.token = token;
        localStorage.setItem("TOKEN", token.toString());
    }
}
const localStorageToken = localStorage.getItem("TOKEN");
const api: ApiClient = new ApiClient({
    token: localStorageToken !== null ? localStorageToken : "",
    url: config.apiPath
});
export { api }