import React, { useEffect, useState } from "react";
import Collection from "./Collection";

const Gallery =  ()=> {
    let [collections, setCollections] = useState({});

    const fetchColletions = async() => {
        const resp = await fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail&limit=25');
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
                    .filter(collection => collection?.id && collection?.title && collection?.image_id)
                    .map((collection, index, id) => (
                        <Collection key={index + id} id={collection?.id} title={collection?.title} imgAlt={collection?.thumbnail?.alt_text} img={`${collections?.config?.iiif_url}/${collection?.image_id}/full/200,/0/default.jpg`} />
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
        <h2>Art Institute of Chicago</h2>
        <h3>Art Gallery</h3>
        {collections ? <div className="flex">{collectionsGallery(collections)}</div> : null}
    </div>
);

};

export default Gallery;