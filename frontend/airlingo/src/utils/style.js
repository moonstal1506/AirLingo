const combineShape = (obj, shape) => {
    const shapeArr = shape.split("-");
    if (!shapeArr) return "";
    return shapeArr.map((curShape) => obj[curShape]).join("");
};

export default combineShape;
