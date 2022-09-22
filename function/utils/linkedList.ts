class SubTitleLinkedList<T>{
    data: T;
    dataIndex: number;
    constructor(data: T, index: number) {
        this.data = data;
        this.dataIndex = index;
    }
}


class LinkedList<T>{
    data: T;
    constructor(data: T) {
        this.data = data;
    }
}

export { SubTitleLinkedList, LinkedList };