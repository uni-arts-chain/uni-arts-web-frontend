import axios from "axios";
import { API_DEFAULT_CONFIG } from "@/config/index";
import {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc,
} from "@/interceptors/axios";

const axiosInstance = axios.create(API_DEFAULT_CONFIG);

axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
