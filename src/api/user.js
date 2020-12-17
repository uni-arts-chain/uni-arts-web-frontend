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
        params: {},
        options: {},
    },
    {
        name: "postArt",
        method: "POST",
        desc: "上传艺术品",
        path: "/arts",
        mockPath: "/arts",
        params: {},
        options: {
            upload: [
                "img_main_file1",
                "img_main_file2",
                "img_main_file3",
                "img_detail_file1",
                "img_detail_file2",
                "img_detail_file3",
                "img_detail_file4",
                "img_detail_file5",
            ],
        },
    },
];

export default apiList;
