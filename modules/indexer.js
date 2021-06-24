const puppeteer = require('puppeteer');

const validators = [
    'nu.nl',
    'rtlnieuws.nl',
    'telegraaf.nl',
    'noordhollandsdagblad.nl',
    'lc.nl',
    'msn.com',
    'leidschdagblad.nl',
    'zeelandnet.nl',
    'haarlemsdagblad.nl',
    'ad.nl',
    'volkskrant.nl'
];
const blockedValidators = [
    'nieuwspaal.nl',
    'speld.nl'
];

module.exports = async (url) => {
    try {
        const browser = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" });

        const splitted = url.split('/');
        const title = splitted.reduce((a, b) => a.length > b.length ? a : b, '');

        const page = await browser.newPage();

        await page.goto(encodeURI(`https://www.google.nl/search?q=${title}`));

        let results = await page.evaluate(() => {

            let elements = document.querySelectorAll('div.g')
            let arr = []

            elements.forEach((item) => {

                arr.push({
                    html: item.innerHTML,
                    title: item.querySelectorAll('h3')[0].innerHTML,
                    linkData: [ ...item.innerHTML.matchAll(/(?:https|http):\/\/(?:www.)?(([a-z-]*).[a-z]{2,3})\/(?:(?!\").)*/gm)][1],
                    missingWords: Array.from(item.querySelectorAll('s')).map(e => e.innerText)
                })
                
            })

            return arr;
        });

        // Extract total validators length, so we can add it up on include.
        score = 100 - validators.length

        checkList = {
            
            blockedValidators: [],
            validators: []
        }

        for (let i = 0; i < results.length; i++) {

            const linkDataExists = results[i].linkData != undefined && results[i].linkData[1] != undefined

            if (linkDataExists && blockedValidators.includes(results[i].linkData[1])) {

                checkList.blockedValidators.push({
                    name: results[i].linkData[1],
                    title: results[i].title,
                    missingWords: results[i].missingWords
                })

                score = score - 50
            }

            if (linkDataExists && validators.includes(results[i].linkData[1])) {

                checkList.validators.push({
                    name: results[i].linkData[1],
                    title: results[i].title,
                    missingWords: results[i].missingWords
                })

                score++
            }

            score -= results[i].missingWords.length

        }

        if (score < 0) {
            score = 0
        }

        await browser.close();

        return {
            fakenewsProbability: score,
            validatorResults: checkList
        };
    } catch (error) {
        console.log(error.message);
        return false;
    }
    
};