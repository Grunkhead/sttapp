module.exports = async (url) => {

    if (!url.includes('uri=')) { 
        return JSON.stringify({ error: 'Could not find uri GET param in the given URI.' })
    }

    // Get URI from get param.
    uri = url.split('=')[1]

    splitted = uri.split('/')
    let title = splitted.reduce((a, b) => a.length > b.length ? a : b, '')

    validators = [
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
    ]

    blockedValidators = [
        'nieuwspaal.nl',
        'speld.nl'
    ]

    const puppeteer = require('puppeteer');

    getJsonResult = async () => {
        const browser = await puppeteer.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
        
        page = await browser.newPage()

        google = 'https://www.google.nl/search?q=' 
        uri    =  encodeURI(google + title)
        
        await page.goto(uri);
        results = await page.evaluate(() => {

            elements = document.querySelectorAll('div.g')
            arr = []

            elements.forEach((item) => {

                arr.push({
                    html: item.innerHTML,
                    title: item.querySelectorAll('h3')[0].innerHTML,
                    linkData: [ ...item.innerHTML.matchAll(/(?:https|http):\/\/(?:www.)?(([a-z-]*).[a-z]{2,3})\/(?:(?!\").)*/gm)][1],
                    missingWords: Array.from(item.querySelectorAll('s')).map(e => e.innerText)
                })
                
            })

            return arr
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

        jsonResult = {

            fakenewsProbability: score,
            validatorResults: checkList
        }

        return JSON.stringify(jsonResult)
    }

    return getJsonResult()
}