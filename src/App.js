import React, { useState } from "react";

function App() {
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState();
    const getPlant = () => {
        fetch(`/plantByName/philodendron`, {
            method: "GET"
        })
            .then(function(response) {
                console.log("response", response);
                // if(!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then(resp => {
                console.log("resp.data", resp.data);
                setPlants(resp.data);
            })
            .catch(function(error) {
                console.log("ERROR: ", error);
                setError("An error occured");
            });
    };
    return (
        <section className="hero  is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Plantlandia</h1>
                    <button className="button" onClick={getPlant}>
                        Get plants
                    </button>
                    <p></p>
                    {plants &&
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
