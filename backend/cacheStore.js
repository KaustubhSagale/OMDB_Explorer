
function createCache({ maxItems = 100, ttlMs = 600000 } = {}) {
  const store = new Map(); 
  function prune() {
    const now = Date.now();
    for (const [k, v] of store) {
      if (v.expiresAt <= now) store.delete(k);
    }
    while (store.size > maxItems) {
      const firstKey = store.keys().next().value;
      store.delete(firstKey);
    }
  }
  return {
    
    get(key) {
      prune();
      const item = store.get(key);
      if (!item) return null;
      if (item.expiresAt <= Date.now()) { store.delete(key); return null; }
      return item.value;
    },
    set(key, value) {
      prune();
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },
    info() { prune(); return { keys: Array.from(store.keys()), size: store.size }; }
  };
}
module.exports = { createCache };
