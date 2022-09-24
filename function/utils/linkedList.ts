class SubTitleLinkedList<T>{
    data: T;
    dataIndex: number;
    next: SubTitleLinkedList<T> | null = null;
    constructor(data: T, index: number) {
        this.data = data;
        this.dataIndex = index;
    }
}


class LinkedList<T>{
    data: T;
    next: LinkedList<T> | null = null;
    constructor(data: T) {
        this.data = data;
    }
}

export { SubTitleLinkedList, LinkedList };