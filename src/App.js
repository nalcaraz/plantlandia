import React, { useState } from "react";
import styled from "styled-components";

function App() {
    const [plants, setPlants] = useState([]);
    const getApi = () => {
        fetch(`/plant`, {
            method: "GET"
        })
            .then(function(response) {
                console.log("response", response);
                // if(!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then(resp => {
                setPlants(resp.data);
            })
            .catch(function(error) {
                console.log("ERROR: ", error);
            });
    };
    return (
        <section className="hero is-success is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Plantlandia</h1>
                    <button className="button" onClick={getApi}>
                        Get plants
                    </button>
                    <br></br>
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
                </div>
            </div>
        </section>
    );
}

export default App;
