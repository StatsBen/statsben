setTimeout(() => {
  caches.open("v1").then(function(cache) {
    return cache.add("hasVisited", true);
  });
}, 20000);
