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
];

export default apiList;
