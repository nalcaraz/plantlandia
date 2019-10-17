import React, { useEffect, useState, Fragment } from "react";

function Plant({ id, name }) {
    const [plant, setPlant] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/.netlify/functions/plantById?id=${id}`, {
            method: "GET"
        })
            .then(function(response) {
                console.log("response", response);
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then(resp => {
                console.log("resp.data", resp);
                setPlant(resp);
                setIsLoading(false);
            })
            .catch(function(error) {
                console.log("ERROR: ", error);
                setIsLoading(false);
                // setError("An error occured");
            });
    }, [id, setIsLoading]);

    console.log("plant", plant);
    return (
        <Fragment>
            {isLoading && (
                <progress className="progress is-small is-primary" max="100">
                    15%
                </progress>
            )}
            {plant.id && (
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64 is-1by1">
                            <img
                                src={
                                    (plant.images.length > 0 &&
                                        plant.images[0].url) ||
                                    "https://bulma.io/images/placeholders/128x128.png"
                                }
                                alt={name}
                            />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{name}</strong>
                                <br />
                                <p>{plant.common_name}</p>
                            </p>
                        </div>
                    </div>
                </article>
            )}
        </Fragment>
    );
}
export default Plant;
