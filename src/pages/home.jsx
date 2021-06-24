import { useRef } from "react";

function Home() {
    const inputField = useRef();
    const inputError = useRef();
    const gaugePointers = useRef([]);

    async function submitHandler(e) {
        const val = inputField.current.value || "";
        if (val.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g)) {
            inputError.current.style.display = "none";
            try {
                const res = await fetch(`/evaluate?uri=${val}`);
                const data = await res.json();
                console.log(data);
            } catch (error) {
                inputError.current.style.display = "block";
                inputError.current.innerHTML = "Oeps! Er ging iets mis tijdens het analyseren. Probeer het opnieuw :)";
            }
        } else {
            inputError.current.style.display = "block";
            inputError.current.innerHTML = "Dit is geen url waar wij iets mee kunnen.";
            console.log(gaugePointers);
        }
    }

    return (
        <>
            <header>
                <div className="content">
                    <div id="intro">
                        <h1>Check <small>your facts</small></h1>
                        <h2>Fact checking made easy</h2>
                        <p>
                            Het doel van Check your facts is om mensen bewuster te maken van het feit dat er steeds meer nepnieuws word verspreid.
                            Hier kan je jouw bronnen laten controleren om erachter te komen of deze waarheid of nep zijn.
                        </p>
                    </div>
                    <div id="checks">
                        <h3>Waar controleren we jou bron op?</h3>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87" /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" /></svg>
                                <h4>Nep/echt</h4>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.88 9.94l.53.53c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-.88-.88c-.39-.39-1.02-.39-1.41 0l-.89.88c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0l.53-.53zM12 17.5c2.03 0 3.8-1.11 4.75-2.75.19-.33-.05-.75-.44-.75H7.69c-.38 0-.63.42-.44.75.95 1.64 2.72 2.75 4.75 2.75zm1.53-7.03c.29.29.77.29 1.06 0l.53-.53.53.53c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-.88-.88c-.39-.39-1.02-.39-1.41 0l-.88.88c-.3.29-.3.77-.01 1.06zM11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                <h4>Satire</h4>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"/></svg>
                                <h4>Gevaarlijk</h4>
                            </div>
                        </div>
                    </div>
                    <div id="form">
                        <span id="error" ref={inputError}></span>
                        <input type="text" name="url" placeholder="Plak de URL hier" ref={inputField} />
                        <button onClick={submitHandler}>Analyseer</button>
                    </div>
                </div>
                {/* <div className="circle" id="c1"></div>
                <div className="circle" id="c2"></div> */}
            </header>
            <main id="results">
                <div className="content">
                    <div className="column">
                        <div className="gauge">
                            <div className="gauge-body">
                                <div className="gauge-1"></div>
                                <div className="gauge-2"></div>
                                <div className="gauge-3"></div>
                                <div className="gauge-4"></div>
                                <div className="gauge-5"></div>
                                <div className="gauge-pointer-body"></div>
                                <div className="gauge-pointer" ref={el => gaugePointers.current[0] = el}></div>
                            </div>
                            <span className="label-1">Echt</span>
                            <span className="label-2">Neutraal</span>
                            <span className="label-3">Nep</span>
                        </div>
                        <div className="meter-intro">
                            <h5>Nep of echt?</h5>
                            <p>
                                <b>De URL is beoordeeld als <small>nep</small>.</b><br />De bron kwam namelijk niet bij ons als legitieme nieuwszender. <br /><small>lees meer over onze bron...</small>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="gauge">
                            <div className="gauge-body">
                                <div className="gauge-1"></div>
                                <div className="gauge-2"></div>
                                <div className="gauge-3"></div>
                                <div className="gauge-4"></div>
                                <div className="gauge-5"></div>
                                <div className="gauge-pointer-body"></div>
                                <div className="gauge-pointer" ref={el => gaugePointers.current[1] = el}></div>
                            </div>
                            <span className="label-1">Satire</span>
                            <span className="label-2">Neutraal</span>
                            <span className="label-3">Propaganda</span>
                        </div>
                        <div className="meter-intro">
                            <h5>Grapje?</h5>
                            <p>
                                <b>De URL is beoordeeld als <small>satire</small>.</b><br />De bron van het artiekel is een bekende comedische site.<br /><small>lees meer over onze lijst...</small>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="gauge">
                            <div className="gauge-body">
                                <div className="gauge-1"></div>
                                <div className="gauge-2"></div>
                                <div className="gauge-3"></div>
                                <div className="gauge-4"></div>
                                <div className="gauge-5"></div>
                                <div className="gauge-pointer-body"></div>
                                <div className="gauge-pointer" ref={el => gaugePointers.current[2] = el}></div>
                            </div>
                            <span className="label-1">Ongevaarlijk</span>
                            <span className="label-2">Neutraal</span>
                            <span className="label-3">Gevaarlijk</span>
                        </div>
                        <div className="meter-intro">
                            <h5>Gevaarlijk?</h5>
                            <p>
                                <b>De URL is beoordeeld als <small>ongevaarlijk</small>.</b><br />Het onderwerp dat wordt besproken is zorgt niet voor mogelijk gevaarlijke situaties.<br /><small>lees meer over propaganda...</small>
                            </p>
                        </div>
                    </div>
                    <div className="actions">
                        <button>Opnieuw</button>
                        <button>Lees meer over nepnieuws</button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;