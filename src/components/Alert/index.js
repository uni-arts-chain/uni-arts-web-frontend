import AlertComponent from "./Alert";
import Vue from "vue";

const AlertComponentConstructor = Vue.extend(AlertComponent);

let authorCallBack = () => {};

function show(type) {
    let instance = new AlertComponentConstructor({
        el: document.createElement("div"),
    });
    type ? (instance.noteType = type) : "";
    instance.author = () => {
        authorCallBack();
    };
    let currentEl = document.querySelector(
        `div.uni__alert[${AlertComponent._scopeId}]`
    );
    if (currentEl) {
        window.document.body.removeChild(currentEl);
    }
    window.document.body.insertBefore(
        instance.$el,
        window.document.body.children[0]
    );
}

function close(visible) {
    if (!visible) {
        let el = document.querySelector(
            `div.uni__alert[${AlertComponent._scopeId}]`
        );
        if (el) {
            window.document.body.removeChild(el);
        }
    }
}

function setAuthor(callback) {
    authorCallBack = callback;
}

export default {
    show,
    close,
    setAuthor,
};
