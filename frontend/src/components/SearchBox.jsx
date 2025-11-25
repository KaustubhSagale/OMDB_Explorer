import React, { useState } from "react";


export default function SearchBox({ onSearch }){
  const [q, setQ] = useState("");
  return (
    <form className="search" onSubmit={e=>{ e.preventDefault(); onSearch(q); }}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Type title (e.g., Joker)" />
      <button type="submit">Search</button>
    </form>
  );
}
