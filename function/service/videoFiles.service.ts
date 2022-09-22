import fs from "fs";
import path from "path";
import * as child from 'child_process';

import { parse, stringify, compile, decompile } from 'ass-compiler';
import log from "../logger";
const searchVideoSubtitle = (id: string) => {
    const filePath = path.resolve("video", id.split('.')[0], id);
    if (fs.existsSync(filePath)) {
        child.exec(`ccextractor ./video/${id.split('.')[0]}/${id}`, (error, stdout, stderr) => {
            if (error) {

                return;
            }
            if (stderr) {
                log.info(stderr)
                return;
            }

        });
        const folderPath = path.resolve("video", id.split('.')[0]);
        let files = fs.readdirSync(folderPath);
        const ext = 'ass';
        var results: string[] = [];
        /* files.forEach((file) => {
            let newBase = path.join(folderPath, file);
            if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                results.push(newBase);
            }
        }); */
        for (const file of files) {
            let newBase = path.join(folderPath, file);
            if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                log.info(newBase)
                results.push(newBase);
            }
        }
        return results;
    }
    else {
        return [];
    }
}

const searchKeyword = async (sub: string[], keyword: string) => {
    const set = new Set<{ Start: string, End: string, Text: string }>();
    sub.forEach(element => {
        fs.readFile(element, "utf-8", (err, data) => {
            if (err) {
                log.error(err);
            }
            let b = parse(data.toString());
            log.info(b);
        })
    });
}
export { searchVideoSubtitle };