import React, { useState, useEffect, useCallback } from "react";
import debounce from "./helpers/debounce";
import Plant from "./components/Plant";

function App() {
    const [query, setQuery] = useState("");
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const getPlants = q => {
        fetch(`/plantByName/${q}`, {
            method: "GET"
        })
            .then(function(response) {
                console.log("response", response);
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then(resp => {
                console.log("resp.data", resp.data);
                setPlants(resp.data);
                setIsLoading(false);
            })
            .catch(function(error) {
                console.log("ERROR: ", error);
                setIsLoading(false);
                setError("An error occured");
            });
    };

    const handleClear = () => {
        setPlants([]);
        setQuery("");
        setError(null);
        setHasSearched(false);
    };

    const handleSearch = e => {
        setIsLoading(true);
        setError(null);
        setQuery(e.target.value);
        setHasSearched(true);
    };
    const debouncedQuery = useCallback(debounce(q => getPlants(q), 500), []);

    useEffect(() => {
        if (query) {
            debouncedQuery(query);
        }
    }, [debouncedQuery, query]);

    return (
        <section className="hero is-success is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <p className="title">Plantlandia</p>
                    <div className="columns container">
                        <div className="column is-half">
                            <input
                                value={query}
                                className="input"
                                type="text"
                                placeholder="Type plant name to search"
                                onChange={handleSearch}></input>
                        </div>
                        <div className="column">
                            <button className="button" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="column is-half">
                            <progress
                                className="progress is-small is-warning"
                                max="100">
                                15%
                            </progress>
                        </div>
                    )}
                    <p></p>
                    {plants &&
                        plants.length > 0 &&
                        plants.map(p => {
                            return (
                                <div key={p.id} className="box column is-half">
                                    <Plant
                                        id={p.id}
                                        name={p.scientific_name}></Plant>
                                </div>
                            );
                        })}
                    {hasSearched &&
                        !isLoading &&
                        plants &&
                        plants.length === 0 && <p>No plants found</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </section>
    );
}

export default App;
