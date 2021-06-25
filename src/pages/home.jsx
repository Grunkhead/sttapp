import { useRef, useState } from "react";
import Intro from "../components/intro";
import Checks from "../components/checks";
import Gauge from "../components/gauge";

function Home() {
    const [result, setResult] = useState(null);
    const inputField = useRef();
    const inputError = useRef();

    async function submitHandler(e) {
        const val = inputField.current.value || "";
        if (val.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g)) {
            inputError.current.style.display = "none";
            try {
                const res = await fetch(`http://localhost:8080/evaluate?uri=${val}`);
                const data = await res.json();

                if (!data.success) throw new Error("analyse failed");

                setResult(data);

                window.scrollTo(0, document.getElementById("results").offsetTop);

            } catch (error) {
                inputError.current.style.display = "block";
                inputError.current.innerHTML = "Oeps! Er ging iets mis tijdens het analyseren. Probeer het opnieuw :)";
            }
        } else {
            inputError.current.style.display = "block";
            inputError.current.innerHTML = "Dit is geen url waar wij iets mee kunnen.";
        }
    }

    function retryHandler() {
        window.scrollTo(0, document.getElementById("form").offsetTop);
        setResult(null);
    }

    return (
        <>
            <header>
                <div className="content">
                    <Intro />
                    <Checks />
                    <div id="form">
                        <span id="error" ref={inputError}></span>
                        <input type="text" name="url" placeholder="Plak de link hier" ref={inputField} />
                        <button onClick={submitHandler}>Analyseer</button>
                    </div>
                </div>
            </header>
            {result && <main id="results">
                <div className="content">
                    <div className="column">
                        <h4>Het resultaat:</h4>
                        <div className="devider"></div>
                    </div>
                    <div className="column">
                        <Gauge labels={["Echt", "Neutraal", "Nep"]} value={result ? result.fakenewsProbability : 0} />
                        <div className="meter-intro">
                            <h5>Nep of echt?</h5>
                            <p>
                                <b>De link is beoordeeld als <small>{ result.fakenewsProbability > 60 ? "echt" : result.fakenewsProbability > 40 ? "Neutraal" : "Nep"}</small>.</b><br />We hebben jouw opgegeven bron uit de link vergeleken met andere bronnen op het internet.<br /><small>Waarom is dit { result.fakenewsProbability > 60 ? "echt" : result.fakenewsProbability > 40 ? "Neutraal" : "Nep"}?</small>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <Gauge labels={["Satire", "Neutraal", "Propaganda"]} value={50} />
                        <div className="meter-intro">
                            <h5>Grapje?</h5>
                            <p>
                                <b>De link is beoordeeld als <small>neutraal</small>.</b><br />Deze module is nog te onbetrouwbaar voor advies.<br /><small>Waarom is dit een grapje?</small>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <Gauge labels={["Ongevaarlijk", "Neutraal", "Gevaarlijk"]} value={50} />
                        <div className="meter-intro">
                            <h5>Gevaarlijk?</h5>
                            <p>
                                <b>De link is beoordeeld als <small>neutraal</small>.</b><br />Deze module is nog te onbetrouwbaar voor advies.<br /><small>Waarom is dit propaganda?</small>
                            </p>
                        </div>
                    </div>
                    <div className="actions">
                        <button onClick={retryHandler}>Opnieuw</button>
                        <button>Lees meer over nepnieuws</button>
                    </div>
                </div>
            </main>
            }
        </>
    );
}

export default Home;