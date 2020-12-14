const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home/Index.vue"),
    },
    {
        path: "/market",
        name: "Market",
        component: () =>
            import(/* webpackChunkName: "market" */ "@/views/Market/Index.vue"),
    },
    {
        path: "/artist",
        name: "Artist",
        component: () =>
            import(/* webpackChunkName: "artist" */ "@/views/Artist/Index.vue"),
    },
    {
        path: "/artist-detail/:id",
        name: "ArtistDetail",
        component: () =>
            import(
                /* webpackChunkName: "artist" */ "@/views/Artist/Detail.vue"
            ),
    },
    {
        path: "/art/:id",
        name: "ArtDetail",
        component: () =>
            import(/* webpackChunkName: "art" */ "@/views/Art/Index.vue"),
    },
    {
        path: "/account",
        name: "Account",
        meta: {
            needAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "account" */ "@/views/Account/Index.vue"
            ),
        children: [
            {
                path: "/",
                name: "AccountIndex",
                meta: {
                    needAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "accountIndex" */ "@/views/Account/Own.vue"
                    ),
            },
            {
                path: "purchase",
                name: "AccountPurchase",
                meta: {
                    needAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "accountPurchase" */ "@/views/Account/Purchase.vue"
                    ),
            },
            {
                path: "sale",
                name: "AccountSale",
                meta: {
                    needAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "accountSale" */ "@/views/Account/Sale.vue"
                    ),
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(
                /* webpackChunkName: "account" */ "@/views/Session/Login.vue"
            ),
    },
];

export default routes;
