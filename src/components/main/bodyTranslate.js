export default function (isKz,bodyOrig) {

    if (isKz) {
        return bodyOrig.map(bodyElem => {
            bodyElem.title = bodyElem.titleKz;
            bodyElem.desc = bodyElem.descKz;
            bodyElem.body = bodyElem.bodyKz;
            return bodyElem
        });
    } 
    return bodyOrig.map(bodyElem => {
        bodyElem.title = bodyElem.titleRu;
        bodyElem.desc = bodyElem.descRu;
        bodyElem.body = bodyElem.bodyRu;
        return bodyElem
    })
}