/* Map canonical course lessons onto legacy runtime IDs without rewriting saves. */
(function(){
  const legacyToCanonical = Object.freeze({'1-A':1,'1-B':2,'1-C':3,'1-D':3,'1-E':3,'2-A':4,'2-B':5,'2-C':6,'2-D':6,'3-A':7,'3-B':8,'3-C':9,'3-D':9});
  const primary = Object.freeze({1:'1-A',2:'1-B',3:'1-C',4:'2-A',5:'2-B',6:'2-C',7:'3-A',8:'3-B',9:'3-C'});
  window.FRITZ_FOUNDATION_RUNTIME_MAP = legacyToCanonical;
  window.fritzCanonicalForRuntimeId = function(runtimeId){
    const n=legacyToCanonical[runtimeId];
    if(!n) return null;
    const meta=(window.FRITZ_CANONICAL_FOUNDATION||[]).find(x=>x.courseLesson===n);
    return meta ? Object.assign({runtimeId,canonicalLesson:n,primaryRuntimeId:primary[n]},meta) : null;
  };
  window.fritzRuntimeIdForCanonical = function(n){ return primary[n] || null; };
  window.fritzIsLegacyBridgeStage = function(runtimeId){ const n=legacyToCanonical[runtimeId]; return !!n && primary[n]!==runtimeId; };
})();