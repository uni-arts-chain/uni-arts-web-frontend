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
    {
        name: "getAuthorArts",
        method: "GET",
        desc: "获取作品材质",
        path: "/members/{:id}/arts",
        mockPath: "/members/{:id}/arts",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getPopArts",
        method: "GET",
        desc: "获取热门作品",
        path: "/arts/popular",
        mockPath: "/arts/popular",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getTopicArts",
        method: "GET",
        desc: "获取推荐主题作品",
        path: "/arts/topic",
        mockPath: "/arts/topic",
        params: {},
        options: {
            unSignature: true,
        },
    },
    {
        name: "getPopularAuthor",
        method: "GET",
        desc: "获取推荐艺术家",
        path: "/members/popular",
        mockPath: "/members/popular",
        params: {},
        options: {
            unSignature: true,
        },
    },
];

export default apiList;
