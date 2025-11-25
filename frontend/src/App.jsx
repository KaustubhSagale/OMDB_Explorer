import React, { useState } from "react";
import {  getMovieDetails, searchMovies } from "./services/apiClient";
import SearchBox from "./components/SearchBox";
import ListCard from "./components/ListCard";
import DetailPane from "./components/DetailPane";

import "./App.css";


export default function App(){
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(q){
    setError(null);
    const res = await searchMovies(q);
    if(res && res.results) setItems(res.results);
    else {
      setItems([]);
      setError(res && res.message ? res.message : 'No results');
    }
  }

  return (
    <div className="root">
      <header><h1>OMDB Quick Explorer</h1></header>
      <SearchBox onSearch={handleSearch}/>
      <main className="layout">
        <section className="list">
          {error && <div className="notice">{error}</div>}
          <ListCard items={items} onPick={setActiveId}/>
        </section>
        <aside className="pane">
          <DetailPane id={activeId} fetcher={getMovieDetails} onClose={()=>setActiveId(null)}/>
        </aside>
      </main>
      <footer className="foot">Simple proxy + cache demo</footer>
    </div>
  );
}
