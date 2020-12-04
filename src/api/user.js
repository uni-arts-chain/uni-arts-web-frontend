const apiList = [
    {
        name: "login",
        method: "POST",
        desc: "登录",
        path: "/members/user_address_login",
        mockPath: "/members/user_address_login",
        params: {
            address: "",
            message: "",
            signature: "",
        },
        options: {},
    },
    {
        name: "getInfo",
        method: "GET",
        desc: "登录",
        path: "/members/user_info",
        mockPath: "/members/user_info",
        params: {},
        options: {},
    },
    {
        name: "ownArts",
        method: "GET",
        desc: "获取所属作品集",
        path: "/arts/mine",
        mockPath: "/arts/mine",
        params: {
            address: "",
            message: "",
            signature: "",
        },
        options: {},
    },
];

export default apiList;
