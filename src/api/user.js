const apiList = [
    {
        name: "register",
        method: "POST",
        desc: "注册",
        path: "/members/address_user_create",
        mockPath: "/members/address_user_create",
        params: {
            address: "",
            message: "",
            signature: "",
        },
        options: {},
    },
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
];

export default apiList;
