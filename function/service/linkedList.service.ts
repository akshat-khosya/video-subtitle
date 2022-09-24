import log from "../logger";
import { LinkedList, SubTitleLinkedList } from "../utils/linkedList";

const createLinkedList = (keyword: string) => {

    let keywordTemp = new LinkedList("");
    let keywordHead = keywordTemp;
    let temp = "";
    for (let i = 0; i < keyword.length; i++) {
        if (keyword[i] === " ") {
            if (temp.length !== 0) {
                
                keywordTemp.next = new LinkedList(temp);
                keywordTemp=keywordTemp.next;
                temp = "";
            }
        }
        else {
            temp += keyword[i];
        }
    }
    if (temp.length !== 0) {
        
        keywordTemp.next = new LinkedList(temp);
        keywordTemp=keywordTemp.next;
    }
    return keywordHead.next === null ? keywordHead : keywordHead.next;

}

const getNodes = (subs: Array<any>): {
    subData: Array<any>;
    node: SubTitleLinkedList<string>;
}[] => {

    let results: { subData: Array<any>, node: SubTitleLinkedList<string> }[] = [];
    for (let s of subs) {

        results.push(createSubtitleNode(s));
    }
    return results;
}

const createSubtitleNode = (sub: Array<any>) => {
    let subtitleTemp = new SubTitleLinkedList("", 0);
    let subtitleData: Array<any> = [];

    let subtitleHead = subtitleTemp;

    for (let i = 0; i < sub.length; i++) {

        let data = {
            Start: sub[i].Start,
            End: sub[i].End,
            Text: sub[i].Text.combined
        };
        // log.info(data.Text+" : "+i);
        subtitleData.push(data);
        subtitleTemp.next = createsubLinkedList(data.Text, i);
        subtitleTemp = subtitleTemp.next;
    }
    return { subData: subtitleData, node: subtitleHead.next === null ? subtitleHead : subtitleHead.next };
}
const createsubLinkedList = (keyword: string, index: number) => {
    keyword = keyword.toLowerCase();
    let keywordTemp = new SubTitleLinkedList("", index);
    let keywordHead = keywordTemp;
    let temp = "";
    for (let i = 0; i < keyword.length; i++) {
        if (keyword[i] === " ") {
            if (temp.length !== 0) {

                keywordTemp.next = new SubTitleLinkedList(temp, index);
                keywordTemp=keywordTemp.next;
                temp = "";
            }
        } else if (keyword[i] >= "a" && keyword[i] <= "z") {
            if (keyword[i] === "n" && i - 1 > 0 && keyword[i - 1] === "\\") {

                if (temp.length !== 0) {

                    keywordTemp.next = new SubTitleLinkedList(temp, index);
                    keywordTemp=keywordTemp.next;
                    temp = "";
                }


            } else {
                temp += keyword[i];
            }
        } else {
            if (temp.length !== 0) {

                keywordTemp.next = new SubTitleLinkedList(temp, index);
                keywordTemp=keywordTemp.next;
                temp = "";
            }
        }
    }
    if (temp.length !== 0) {

        keywordTemp.next = new SubTitleLinkedList(temp, index);
        keywordTemp=keywordTemp.next;
    }
    return keywordHead.next === null ? keywordHead : keywordHead.next;

}
const searchQuery = (node: LinkedList<string>, subTitleNodes: { subData: Array<any>, node: SubTitleLinkedList<string> }[]) => {
    let result: Array<{ startIndex: number, endIndex: number }> = [];
    let temp = node;
    
    subTitleNodes.forEach((subNode) => {
        let subTemp = subNode.node;
        log.info(subTemp);
        while (subTemp !== null) {
            let tempArray: { startIndex: number, endIndex: number } = { startIndex: -1, endIndex: -1 };
            let subTempTemp = subTemp;
            if (subTempTemp.data === temp.data || (temp === node && subTempTemp.data.includes(temp.data))) {
                
                if (temp === node) {
                    tempArray.startIndex = subTempTemp.dataIndex;
                }
                if (temp.next === null) {
                    tempArray.endIndex = subTempTemp.dataIndex;
                    result.push(tempArray);
                    break;
                }
                temp = temp.next;
                if (subTempTemp.next === null) {
                    temp = node;
                    break;
                }
                subTempTemp = subTempTemp.next;
                while (temp !== null && subTempTemp !== null) {
                    log.info(temp.data);
                    if (temp.next === null) {
                        if (subTempTemp.data === temp.data || subTempTemp.data.includes(temp.data)) {
                            tempArray.endIndex = subTempTemp.dataIndex;
                            temp = node;
                            break;
                        } else {
                            temp = node;
                            break;
                        }

                    } else {
                        if (subTempTemp.data === temp.data) {
                            temp = temp.next;
                            if (subTempTemp.next === null) {
                                temp = node;
                                break;
                            }
                            subTempTemp = subTempTemp.next;
                        } else {
                            temp = node;
                            break;
                        }
                    }
                }
                if (tempArray.endIndex !== -1) {
                    result.push(tempArray);
                }
            } else {
                if (subTemp.next === null) {
                    temp = node;
                    break;
                }
                subTemp = subTemp.next;
            }

        }
        if (result.length !== 0) {
            return result;

        }
    });
    log.info(result);
    return result;
}

const createQueryData = (data: Array<{ startIndex: number, endIndex: number }>) => {

    data.forEach((block) => {
        if (block.startIndex === block.endIndex) {

        }
    })
}
export { createLinkedList, createSubtitleNode, getNodes, searchQuery };