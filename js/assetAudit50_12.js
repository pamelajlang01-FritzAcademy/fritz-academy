/* Fritz Academy Runtime Asset Audit v50.12 */
(function(){
  "use strict";

  function checkImage(src){
    return new Promise(resolve=>{
      if(!src){ resolve(false); return; }
      const image=new Image();
      image.onload=()=>resolve(true);
      image.onerror=()=>resolve(false);
      image.src=`${src}${src.includes("?")?"&":"?"}audit=50.12`;
    });
  }

  async function run(){
    const registry=window.FritzAssetRegistry;
    if(!registry) return {version:"50.12",error:"Registry not loaded",results:[]};

    const rows=registry.audit();
    const results=[];
    for(const row of rows){
      const productionExists=await checkImage(row.production);
      results.push({...row,productionExists});
    }

    const characterResults=results.filter(row=>row.type==="character");
    const environmentResults=results.filter(row=>row.type==="environment");
    const summary={
      version:"50.12",
      charactersReady:characterResults.filter(row=>row.productionExists).length,
      charactersTotal:characterResults.length,
      environmentsReady:environmentResults.filter(row=>row.productionExists).length,
      environmentsTotal:environmentResults.length,
      missingCharacters:characterResults.filter(row=>!row.productionExists).map(row=>row.name),
      missingEnvironments:environmentResults.filter(row=>!row.productionExists).map(row=>row.name),
      results
    };

    window.FritzAssetAuditReport=summary;
    console.group("[Fritz Academy] Production Asset Audit v50.12");
    console.table(results.map(row=>({type:row.type,id:row.id,productionReady:row.productionReady,fileExists:row.productionExists,active:row.active})));
    console.info(`Characters installed: ${summary.charactersReady}/${summary.charactersTotal}`);
    console.info(`Environments installed: ${summary.environmentsReady}/${summary.environmentsTotal}`);
    console.groupEnd();
    return summary;
  }

  window.FritzAssetAudit={version:"50.12",run};
  window.addEventListener("load",()=>run());
})();
