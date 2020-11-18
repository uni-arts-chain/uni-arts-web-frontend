import { ApiParams } from "@/plugins/api";

const apiList: Array<ApiParams> = [
    {
        name: "getCurrencies",
        method: "GET",
        desc: "获取币种列表",
        path: "/currencies",
        mockPath: "/currencies",
        params: {},
        options: {
            unSignature: true,
        },
    },
];

export default apiList;
