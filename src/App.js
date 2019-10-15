import React, { useState, useEffect, useCallback } from "react";
import debounce from "./helpers/debounce";

function App() {
    const [query, setQuery] = useState("");
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getPlants = () => {
        fetch(`/plantByName/${query}`, {
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
    };

    const handleSearch = (e)=>{
        setIsLoading(true);
        setError(null);
        setQuery(e.target.value);
       
    }
    const debouncedQuery = useCallback(debounce(getPlants, 1000), []);

    useEffect(() => {
        if (query) {
            debouncedQuery(query)
        }
    }, [query]);

    return (
        <section className="hero is-success is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Plantlandia</h1>
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
                        <progress
                            class="progress is-small is-warning"
                            max="100">
                            15%
                        </progress>
                    )}
                    <p></p>
                    {!isLoading &&
                        plants &&
                        plants.length > 0 &&
                        plants.map(p => {
                            return (
                                p.common_name != null && (
                                    <div className="box">
                                        <p>{p.common_name}</p>
                                    </div>
                                )
                            );
                        })}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </section>
    );
}

export default App;
