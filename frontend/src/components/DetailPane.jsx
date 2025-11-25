import React, { useEffect, useState } from "react";


export default function DetailPane({ id, fetcher, onClose }){
  const [info, setInfo] = useState(null);
  useEffect(()=>{
    if(!id) return setInfo(null);
    let alive = true;
    fetcher(id).then(d => { if(alive) setInfo(d) });
    return ()=>{ alive = false };
  }, [id]);

  if(!id) return <div className="start">Pick a movie to view details</div>;
  if(!info) return <div className="loading">Loading...</div>;
  return (
    <div className="detail">
      <button className="close" onClick={onClose}>x</button>
      <h3>{info.title} ({info.year})</h3>
      <div className="flex">
        {info.poster ? <img src={info.poster} alt={info.title}/> : <div className="noimg">No image</div>}
        <div className="attrs">
          <p><strong>Director:</strong> {info.director}</p>
          <p><strong>Actors:</strong> {info.actors}</p>
          <p><strong>Genre:</strong> {info.genre}</p>
          <p><strong>IMDB:</strong> {info.rating} ({info.votes})</p>
        </div>
      </div>
      <section><h4>Plot</h4><p>{info.plot}</p></section>
    </div>
  );
}
