import React, { useEffect, useState } from "react";
import Collection from "./Collection";

const Gallery =  ()=> {
    let [collections, setCollections] = useState({});

    const fetchColletions = async() => {
        const resp = await fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,thumbnail&limit=25');
        if (!resp.ok) {
            throw new Error("Error");
        }
        const data = await resp.json();
        setCollections(data);
    }

    useEffect(() => {
        fetchColletions();
    }, []);

    const collectionsGallery = (collections) => {
        console.log(collections);
    
        if (!collections?.data || !Array.isArray(collections?.data)) {
            return null;
        }
    
        return (
            <>
                {collections.data
                    .filter(collection => collection?.id && collection?.title)
                    .map((collection, index) => (
                        <Collection key={index} title={collection.title} img={collection.thumbnail} />
                    ))
                }
            </>
        );
    };

    useEffect(() => {
        collectionsGallery(collections);
    }, [collections]);

   return (
    <div>
        <h3>Gallery</h3>
        {collections ? collectionsGallery(collections) : null}
    </div>
);

};

export default Gallery;