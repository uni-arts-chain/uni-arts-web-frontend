const apiList = [
    {
        name: "getArtById",
        method: "GET",
        desc: "获取指定ID作品",
        path: "/arts/{:id}",
        mockPath: "/arts/{:id}",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getCategories",
        method: "GET",
        desc: "获取作品分类",
        path: "/arts/categories",
        mockPath: "/arts/categories",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getThemes",
        method: "GET",
        desc: "获取作品主题",
        path: "/arts/themes",
        mockPath: "/arts/themes",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getMaterials",
        method: "GET",
        desc: "获取作品材质",
        path: "/arts/materials",
        mockPath: "/arts/materials",
        params: {},
        options: {
            unSignature: true,
        },
    },
];

export default apiList;
