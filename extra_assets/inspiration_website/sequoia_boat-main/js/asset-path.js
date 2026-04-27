(function(){
  const V = window.APP_VERSION || 'dev';
  window.assetPath = function(src){
    if(!src) return src;
    // Avoid duplicating version
    return src.includes('?v=') ? src : `${src}?v=${V}`;
  };
})(); 