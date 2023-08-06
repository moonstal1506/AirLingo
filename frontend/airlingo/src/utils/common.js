function isKeyInObj(obj, key) {
    if (!obj || !key) {
        console.log("제대로, props를 넘겨주세요");
        return false;
    }

    return Object.prototype.hasOwnProperty.call(obj, key);
}

export default isKeyInObj;
