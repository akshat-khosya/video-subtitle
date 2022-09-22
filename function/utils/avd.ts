import puppeteer from "puppeteer";

const avd = async (url: string, dev = true) => {
    return new Promise(async (resolve, reject) => {
        let browser = await puppeteer.launch({
            headless: !dev,
            args: ["--disable-setuid-sandbox", "--disable-notifications"],
            ignoreHTTPSErrors: true,
        });

        try {
            const URL = "https://en.savefrom.net/65/";
            const page = await browser.newPage();
            await page.goto(URL);
            await page.type("#sf_url", url, { delay: 0 });
            await page.click("#sf_submit");
            await page.waitForSelector(".media-result");
            const result = await page.evaluate(() => {
                let temp = document.querySelector(".media-result .clip img");
                const thub = temp ? temp.getAttribute("src") : "https://res.cloudinary.com/alasim/image/upload/v1638853249/hosting%20content/jk-placeholder-image_lj3awz.jpg";
                const info = document.querySelector(".info-box");
                if (info === null) {
                    return;
                }
                temp = info.querySelector(".title");
                const title = temp ? temp.textContent : "No Title";
                temp = info.querySelector(".duration");
                const duration = temp ? temp.textContent : "";
                const link_group = [...info.querySelectorAll(".link-group a")];
                let links = link_group.map((link) => {
                    const video_format = link.getAttribute("title");
                    const href = link.getAttribute("href");
                    const text = link.textContent;
                    return { video_format, href, text };
                });
                if (links.length === 0) {
                    const link = info.querySelector(".link-download");
                    const video_format = "";
                    const href = link && link.getAttribute("href");
                    const text = link && (link.textContent && link.textContent.replace("Download", "").trim());
                    links.push({ video_format, href, text });
                }
                return {
                    info: { title, thub, duration },
                    links,
                };
            });
            browser.close();
            resolve(result);
        } catch (error) {
            browser.close();
            reject(error);
        }
    });
}


export default avd;