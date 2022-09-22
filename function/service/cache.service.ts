var map = new Map<String, Boolean>();

const addToMap = (key: string, value: boolean) => {
    map.set(key, value);
}

const getFromMap = (key: string) => {
    if (map.has(key)) {
        return map.get(key);
    }
    return null;
}

const removeFromMap = (key: string) => {
    map.delete(key);
}

export { addToMap, getFromMap, removeFromMap };