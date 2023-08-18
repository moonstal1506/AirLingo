function isKeyInObj(obj, key) {
    if (!obj || !key) {
        return false;
    }

    return Object.prototype.hasOwnProperty.call(obj, key);
}

export default isKeyInObj;
