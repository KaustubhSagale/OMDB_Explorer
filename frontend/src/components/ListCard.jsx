import React from "react";


export default function ListCard({ items = [], onPick }){
  if(!items || items.length === 0) return <div className="empty">No movies yet</div>;
  return (
    <div className="grid">
      {items.map(it => (
        <article key={it.id} className="card" onClick={()=>onPick(it.id)}>
          <div className="thumb">{it.poster ? <img src={it.poster} alt={it.name}/> : <div className="noimg">No image</div>}</div>
          <div className="meta">
            <h4>{it.name}</h4>
            <small>{it.year}</small>
          </div>
        </article>
      ))}
    </div>
  );
}
