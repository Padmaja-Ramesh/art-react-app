import React, { useEffect, useState } from "react";
import Collection from "./Collection";
import apiService from "./service";

const Gallery =  ()=> {
    let [collections, setCollections] = useState({});
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

    const fetchColletions = async() => {
        try {
            const resp = await apiService.fetchColletions();
            setCollections(resp);
          } catch (e) {
            setError(e);
          } finally {
            setLoading(false);
          }
        
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

   return (
    <div>
        <h2>Art Institute of Chicago</h2>
        <h3>Art Gallery</h3>
        {collections ? <div className="flex">{collectionsGallery(collections)}</div> : null}
    </div>
);

};

export default Gallery;