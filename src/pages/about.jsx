function About() {
    return (
        <main id="about">
            <div className="content">
                <div className="column">
                    <h4>Nepnieuws:</h4>
                    <div className="devider"></div>
                </div>
                <div className="column">
                    <h4>Wie zijn wij?</h4>
                    <p>
                        Dit iniciatief is begonnen door Stichting Toekomstbeeld der techniek.  (STT) Deze organisatieSTT beseft zich terdege dat toekomstverkenningen geen doel op zich zijn maar bedoeld zijn om de maatschappij, overheidsorganisaties en commerciële partijen te ondersteunen en te inspireren bij het ontwikkelen van hun strategie, beleid en innovatie.
                    </p>
                </div>
                <div className="column">
                    <h4>Hoe werkt het?</h4>
                    <p>
                        De gebruiker voert een titel of link in op de site, daarna gaat de backend kijken of dit artikel geplaatst is door andere betrouwbare publiceerders. Op basis van die analyse maakt geven we een techische score die vertaalt wordt naar behapbare nummers.
                    </p>
                </div>
                <div className="column">
                    <h4>Technische informatie</h4>
                    <p>
                        Wij gebruiken een techniek waarbij jou URL wordt geanalyseerd op basis van kernwoorden, deze kernwoorden worden dan gezocht over het hele internet. Hieruit vinden wij waar het nieuws vandaan komt en dus wat de bronnen hiervan.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default About;