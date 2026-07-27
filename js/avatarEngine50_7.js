/* Fritz Academy canonical avatar engine v50.7 */
(function(){
  "use strict";

  const AVATARS = [
    ["girl-1","Girl 1","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png"],
    ["girl-2","Girl 2","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png"],
    ["girl-3","Girl 3","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png"],
    ["girl-4","Girl 4","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png"],
    ["girl-5","Girl 5","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png"],
    ["girl-6","Girl 6","assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png"],
    ["boy-1","Boy 1","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png"],
    ["boy-2","Boy 2","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png"],
    ["boy-3","Boy 3","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png"],
    ["boy-4","Boy 4","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png"],
    ["boy-5","Boy 5","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png"],
    ["boy-6","Boy 6","assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"]
  ].map(([id,label,src]) => ({id,label,src}));

  window.FRITZ_AVATARS = AVATARS;

  function byId(id){ return AVATARS.find(item => item.id === id) || null; }
  function sourceFor(student){
    const item = student && byId(student.avatar);
    if(item) return item.src;
    return student && typeof student.avatar === "string" && student.avatar.includes("/") ? student.avatar : "";
  }

  function image(src, alt, className){
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = className || "";
    img.loading = "eager";
    img.decoding = "async";
    img.addEventListener("error", () => {
      img.hidden = true;
      const fallback = document.createElement("div");
      fallback.className = "fritz-avatar-fallback";
      fallback.textContent = "Avatar";
      img.replaceWith(fallback);
    }, {once:true});
    return img;
  }

  function avatarGrid(selectedId, onSelect){
    const wrap = document.createElement("section");
    wrap.className = "fritz-avatar-section fritz-avatar-section-canonical";
    const heading = document.createElement("h2");
    heading.textContent = "Choose an Academy Avatar";
    const grid = document.createElement("div");
    grid.className = "fritz-avatar-grid fritz-avatar-grid-canonical";
    let selected = selectedId || "";

    AVATARS.forEach(avatar => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fritz-avatar-choice fritz-avatar-choice-canonical";
      button.dataset.avatarId = avatar.id;
      button.classList.toggle("is-selected", avatar.id === selected);
      button.append(image(avatar.src, avatar.label, "fritz-avatar-full-image"));
      const label = document.createElement("span");
      label.textContent = avatar.label;
      button.append(label);
      button.addEventListener("click", () => {
        selected = avatar.id;
        grid.querySelectorAll(".fritz-avatar-choice").forEach(choice => {
          choice.classList.toggle("is-selected", choice === button);
        });
        if(typeof onSelect === "function") onSelect(avatar.id, avatar);
      });
      grid.append(button);
    });
    wrap.append(heading, grid);
    wrap.getSelectedAvatar = () => selected;
    return wrap;
  }

  function ensureStyles(){
    if(document.getElementById("fritz-avatar-engine-50-7")) return;
    const style = document.createElement("style");
    style.id = "fritz-avatar-engine-50-7";
    style.textContent = `
      .fritz-profile-panel.fritz-avatar-panel{width:min(1050px,96vw)!important;max-height:94vh!important;overflow:auto!important}
      .fritz-avatar-grid-canonical{display:grid!important;grid-template-columns:repeat(4,minmax(135px,1fr))!important;gap:14px!important;width:100%!important}
      .fritz-avatar-choice-canonical{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;min-height:210px!important;padding:10px!important;background:#fff!important;visibility:visible!important;opacity:1!important}
      .fritz-avatar-full-image{display:block!important;width:100%!important;height:165px!important;object-fit:contain!important;object-position:center bottom!important;visibility:visible!important;opacity:1!important}
      .fritz-avatar-choice-canonical span{font-weight:800;font-size:16px;color:#102342}
      .fritz-avatar-choice-canonical.is-selected{border-color:#f6c744!important;box-shadow:0 0 0 4px #174ea6!important}
      .fritz-avatar-fallback{width:100%;height:165px;display:grid;place-items:center;background:#eef3f9;color:#173b6c;font-weight:800;border-radius:12px}
      .fritz-student-card-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:8px}
      .fritz-student-card-actions button{padding:9px 13px;border-radius:10px;border:2px solid #173b6c;background:#fff;color:#173b6c;font-weight:800;cursor:pointer}
      .fritz-student-card-actions .select-student{background:#f6c744}
      @media(max-width:760px){.fritz-avatar-grid-canonical{grid-template-columns:repeat(2,minmax(125px,1fr))!important}}
    `;
    document.head.append(style);
  }

  function protect(root){
    root.querySelectorAll("input,button").forEach(el => {
      ["keydown","keyup","keypress"].forEach(type => el.addEventListener(type, event => event.stopPropagation()));
    });
  }

  function install(){
    ensureStyles();
    if(typeof StudentProfileEngine === "undefined") return;

    StudentProfileEngine.prototype.showChooser = function(){
      this.close();
      const students = this.students();
      const activeId = this.activeId();
      this.overlay = document.createElement("div");
      this.overlay.className = "fritz-profile-overlay";
      this.panel = document.createElement("section");
      this.panel.className = "fritz-profile-panel fritz-profile-panel-wide fritz-avatar-panel";

      const heading = document.createElement("h1");
      heading.textContent = "Choose a Student";
      const subtitle = document.createElement("p");
      subtitle.className = "fritz-profile-subtitle";
      subtitle.textContent = students.length ? "Select a student, change an avatar, or add another learner." : "Create the first student profile to begin.";
      const list = document.createElement("div");
      list.className = "fritz-profile-list fritz-profile-list-visual";

      students.forEach(student => {
        const card = document.createElement("article");
        card.className = "fritz-profile-card fritz-profile-card-visual";
        if(student.id === activeId) card.classList.add("is-active");
        const portrait = document.createElement("div");
        portrait.className = "fritz-profile-avatar";
        const src = sourceFor(student);
        if(src) portrait.append(image(src, `${student.studentName || "Student"} avatar`));
        else portrait.textContent = "⭐";
        const details = document.createElement("div");
        details.className = "fritz-profile-details";
        const name = document.createElement("strong");
        name.textContent = student.studentName || "Academy Student";
        const progress = document.createElement("span");
        progress.textContent = `Current lesson: ${student.currentLevel || "1-A"} • ${Number(student.stars) || 0} stars`;
        const actions = document.createElement("div");
        actions.className = "fritz-student-card-actions";
        const select = document.createElement("button");
        select.type = "button";
        select.className = "select-student";
        select.textContent = student.id === activeId ? "Continue" : "Use This Student";
        select.addEventListener("click", () => this.select(student.id));
        const edit = document.createElement("button");
        edit.type = "button";
        edit.textContent = "Change Avatar";
        edit.addEventListener("click", () => this.showAvatarEditor(student.id));
        actions.append(select, edit);
        details.append(name, progress, actions);
        card.append(portrait, details);
        list.append(card);
      });

      const footer = document.createElement("div");
      footer.className = "fritz-profile-actions";
      const add = document.createElement("button");
      add.type = "button";
      add.className = "fritz-profile-primary";
      add.textContent = "+ Add Student";
      add.addEventListener("click", () => this.showCreateForm());
      footer.append(add);
      if(students.length){
        const close = document.createElement("button");
        close.type = "button";
        close.className = "fritz-profile-secondary";
        close.textContent = "Return to Academy";
        close.addEventListener("click", () => this.close());
        footer.append(close);
      }
      this.panel.append(heading, subtitle, list, footer);
      this.overlay.append(this.panel);
      document.body.append(this.overlay);
      protect(this.panel);
    };

    StudentProfileEngine.prototype.showAvatarEditor = function(studentId){
      if(!this.panel) return;
      const student = this.students().find(item => item.id === studentId);
      if(!student) return;
      this.panel.innerHTML = "";
      this.panel.className = "fritz-profile-panel fritz-profile-panel-wide fritz-avatar-panel";
      const heading = document.createElement("h1");
      heading.textContent = `Choose ${student.studentName || "Student"}'s Avatar`;
      let selectedAvatar = byId(student.avatar) ? student.avatar : "";
      const grid = avatarGrid(selectedAvatar, id => { selectedAvatar = id; });
      const actions = document.createElement("div");
      actions.className = "fritz-profile-actions";
      const save = document.createElement("button");
      save.type = "button";
      save.className = "fritz-profile-primary";
      save.textContent = "Save Avatar";
      save.addEventListener("click", () => {
        if(!selectedAvatar) return;
        if(typeof updateStudentAvatar === "function") updateStudentAvatar(student.id, selectedAvatar);
        else {
          student.avatar = selectedAvatar;
          if(typeof saveGame === "function") saveGame(student);
        }
        window.location.reload();
      });
      const back = document.createElement("button");
      back.type = "button";
      back.className = "fritz-profile-secondary";
      back.textContent = "Back";
      back.addEventListener("click", () => this.showChooser());
      actions.append(save, back);
      this.panel.append(heading, grid, actions);
      protect(this.panel);
      this.panel.scrollTop = 0;
    };

    const originalCreate = StudentProfileEngine.prototype.showCreateForm;
    StudentProfileEngine.prototype.showCreateForm = function(){
      originalCreate.call(this);
      if(!this.panel) return;
      this.panel.classList.add("fritz-avatar-panel");
    };
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();