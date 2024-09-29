const textToJson = async (text) => {
    return JSON.parse(text);
}

const jsonToText = async (json) => {
    return JSON.stringify(json, null, 2);
}

export default { textToJson, jsonToText };