// process.env.NTBA_FIX_319 = 1;
var http           = require('http');
const fetch        = require('node-fetch');
const HTMLParser   = require('node-html-parser')


http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'}); 

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html>
                    <body>
                        <form>
                            <label for="fname">Enter URI</label><br>
                            <input type="text" name="uri" value=""><br>
                            <input type="submit" value="Submit">
                        </form> 
                    </body>
                </html>`
                );
    res.end();

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
        'ad.nl'
    ]

    blockedValidators = [
        'google',
        'speld'
    ]

    blockedRegex           = (validator) => `(?:https|http):\/\/www.${validator}.[a-z]{2,3})`
    calculatePercentage = (score)     => score / validators.length * 100

    fetch(uri)
        .then(res => res.text())
        .then(text => {
            results = [ ...text.matchAll(/(?:https|http):\/\/www.(([a-z-]*).[a-z]{2,3})\/(?:(?!&amp).)*/gm)]
            
            score = 0
            for (i = 0; i < results.length; i++) {

                wordCounter = 0
                for (x = 0; x < words.length; x++) {

                    if (results[i][0].toLowerCase().includes(words[x].toLowerCase())) {
                        wordCounter++
                    }
                }

                score += wordCounter / words.length * 100
            }

            score = score / results.length

            console.log(`Achieved score: ${score}`)
            console.log(`Max achievable score: 100`)
        })

}).listen(8080);