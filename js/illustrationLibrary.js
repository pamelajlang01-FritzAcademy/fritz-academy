/* Fritz Academy Illustration Library v46.0 */
(function(){
  "use strict";

  const characters = {
    fritz: {
      id:"fritz", name:"Captain Fritz", species:"Dalmatian", role:"adult teacher and Academy leader",
      scale:1.0, primary:"assets/captain_fritz.png", fallback:"assets/captain_fritz.png",
      uniform:"white captain uniform", ageGroup:"adult",
      rules:["Only adult dog in the main cast","Always clearly taller and more mature than the student dogs","White captain uniform is canonical"]
    },
    bash: {
      id:"bash", name:"Bash", species:"German Shepherd", role:"oversized younger puppy and protective big brother",
      scale:1.08, primary:"assets/bash.png", fallback:"assets/bash.png",
      uniform:"navy Academy vest", ageGroup:"puppy",
      rules:["Largest student dog","Slightly taller than Captain Fritz and Nola","One ear upright and one floppy","More black than tan","Must retain a youthful puppy face"]
    },
    bear: {
      id:"bear", name:"Bear", species:"German Shepherd", role:"older brother, builder and thoughtful helper",
      scale:0.84, primary:"assets/bear.png", fallback:"assets/bear.png",
      uniform:"green Academy vest", ageGroup:"puppy",
      rules:["Smaller than Bash, Fritz and Nola","Same general height tier as Rascal","More tan than black","Older than Bash"]
    },
    nola: {
      id:"nola", name:"Nola", species:"Cane Corso", role:"confident, creative and caring student",
      scale:1.0, primary:"assets/nola.png", fallback:"assets/nola.png",
      uniform:"pink Academy collar or uniform", ageGroup:"young dog",
      rules:["Same height tier as Captain Fritz","Cane Corso build and charcoal coat","Never relabel as Olive"]
    },
    tony: {
      id:"tony", name:"Tony", species:"White Schnoodle", role:"oldest student and smallest dog",
      scale:0.58, primary:"assets/tony.png", fallback:"assets/tony.png",
      uniform:"purple Academy vest", ageGroup:"young dog",
      rules:["Smallest character by a clear margin","Oldest of the student dogs","Must look tiny beside Bash","White Schnoodle: Poodle and Schnauzer mix"]
    },
    rascal: {
      id:"rascal", name:"Rascal", species:"Golden Retriever", role:"youngest playful student",
      scale:0.84, primary:"assets/rascal.png", fallback:"assets/rascal.png",
      uniform:"orange Academy vest", ageGroup:"puppy",
      rules:["Same general height tier as Bear","Smaller than Fritz and Nola","Golden Retriever coat and puppy features"]
    }
  };

  const avatars = [
    ["girl-1","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png"],
    ["girl-2","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png"],
    ["girl-3","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png"],
    ["girl-4","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png"],
    ["girl-5","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png"],
    ["girl-6","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png"],
    ["boy-1","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png"],
    ["boy-2","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png"],
    ["boy-3","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png"],
    ["boy-4","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png"],
    ["boy-5","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png"],
    ["boy-6","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"]
  ].map(([id,src])=>({id,name:id.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase()),src,type:"student-avatar"}));

  const environments = {
    campus:{id:"campus",name:"Fritz Academy Campus",src:"assets/fritz_academy_world_map.png",tags:["outdoor","campus","map"]},
    academyFront:{id:"academy-front",name:"Academy Front",src:"assets/academy.png",tags:["outdoor","entrance"]},
    welcomeGarden:{id:"welcome-garden",name:"Welcome Garden",src:"assets/fritz_academy_world_map.png",tags:["outdoor","garden"]},
    readingRoom:{id:"reading-room",name:"Reading Room",src:"assets/academy.png",tags:["indoor","reading"]},
    classroom:{id:"classroom",name:"Classroom",src:"assets/academy.png",tags:["indoor","school"]},
    musicRoom:{id:"music-room",name:"Music Room",src:"assets/academy.png",tags:["indoor","music"]},
    playground:{id:"playground",name:"Playground",src:"assets/fritz_academy_world_map.png",tags:["outdoor","play"]}
  };

  const expressions=["happy","laughing","thinking","surprised","sad","proud","curious","worried","excited","focused"];
  const poses=["standing","sitting","walking","running","jumping","waving","pointing","reading","listening","building","singing","celebrating"];

  window.FritzIllustrationLibrary={version:"46.0",characters,avatars,environments,expressions,poses};
})();