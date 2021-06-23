// process.env.NTBA_FIX_319 = 1;
var http           = require('http');
const fetch        = require('node-fetch');
const HTMLParser   = require('node-html-parser')


http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.url.includes('uri=')) {
        uri = req.url.split('=')[1]
        words = uri.split('+')

        words = words.map(w => w.replace(/[^\w\s!?]/g,''))

        console.log(words);

    } else {
        return
    }

    google = 'https://www.google.nl/search?q=' 
    uri    =  encodeURI(google + uri)

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

    (async () => {
        const browser = await puppeteer.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
        const page = await browser.newPage();
        await page.goto(uri);

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

        console.log(results);

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
    
        console.log(`Achieved score: ${score}`)
        console.log(`Max achievable score: 100`)

        await browser.close();

        jsonResult = {

            fakenewsProbability: score,
            validatorResults: checkList
        }

        res.end(JSON.stringify(jsonResult))
    })()

}).listen(8080);