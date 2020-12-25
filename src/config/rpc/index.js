import uart from "./uart";

export default {
    typesSpec: {
        uart,
    },
    types: {
        Address: "MultiAddress",
        LookupSource: "MultiAddress",
    },
};
