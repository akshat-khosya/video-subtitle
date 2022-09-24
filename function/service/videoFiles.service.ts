import fs from "fs";
import path from "path";
import * as child from 'child_process';
import { parse } from 'ass-compiler';


import log from "../logger";
const searchVideoSubtitle = (id: string) => {

    const filePath = path.resolve("video", id.split('.')[0], id);
    if (fs.existsSync(filePath)) {
        child.exec(`ccextractor ./video/${id.split('.')[0]}/${id}`, (error, stdout, stderr) => {
            if (error) {

                return;
            }
            if (stderr) {

                return;
            }

        });
        const folderPath = path.resolve("video", id.split('.')[0]);
        let files = fs.readdirSync(folderPath);
        const ext = 'ass';
        var results: string[] = [];
        for (const file of files) {
            let newBase = path.join(folderPath, file);
            if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {

                results.push(newBase);
            }
        }
        return results;
    }
    else {
        return [];
    }
}

const videoSearch = (sub: string[]) => {
    let set = new Set();
    //readFileSync
    
    sub.forEach((element) => {
        // fs.readFile(element, "utf-8", async (err, data) => {
        //     if (err) {
        //         log.error(err);
        //     }
        //     let b = parse(data.toString()) as any;
        //     let c = b.events.dialogue;
        //     set.add(c);
        // })
        
        let data = fs.readFileSync(element, "utf8");
        
        let b = parse(data.toString()) as any;
        let c = b.events.dialogue;
        set.add(c);
    });
    let res: Array<any> = [];
    for (let a of set) {
        
        res.push(a);
    }
   
    return res;
}
export { searchVideoSubtitle, videoSearch };