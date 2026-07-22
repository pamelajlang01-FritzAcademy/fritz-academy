/*
====================================================
FRITZ ACADEMY
Version 44 Student Avatar System
====================================================
*/
(function(){
  "use strict";

  const FRITZ_AVATARS = [
    {
      id: "girl-1",
      label: "Girl Avatar 1",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_09_47 PM.png"
    },
    {
      id: "girl-2",
      label: "Girl Avatar 2",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_38_28 PM.png"
    },
    {
      id: "girl-3",
      label: "Girl Avatar 3",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 05_46_11 PM.png"
    },
    {
      id: "girl-4",
      label: "Girl Avatar 4",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_04_48 PM.png"
    },
    {
      id: "girl-5",
      label: "Girl Avatar 5",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_26_03 PM.png"
    },
    {
      id: "girl-6",
      label: "Girl Avatar 6",
      src: "assets/avatars/girl/ChatGPT Image Jul 13, 2026, 06_53_21 PM.png"
    },
    {
      id: "boy-1",
      label: "Boy Avatar 1",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 04_52_40 PM.png"
    },
    {
      id: "boy-2",
      label: "Boy Avatar 2",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_30_53 PM.png"
    },
    {
      id: "boy-3",
      label: "Boy Avatar 3",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_43_25 PM.png"
    },
    {
      id: "boy-4",
      label: "Boy Avatar 4",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 05_52_10 PM.png"
    },
    {
      id: "boy-5",
      label: "Boy Avatar 5",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_18_19 PM.png"
    },
    {
      id: "boy-6",
      label: "Boy Avatar 6",
      src: "assets/assets/avatars/boy/ChatGPT Image Jul 13, 2026, 06_47_19 PM.png"
    }
  ];

  function avatarById(id){
    return FRITZ_AVATARS.find(avatar => avatar.id === id) || null;
  }

  function avatarSource(student){
    if(!student) return "";
    const selected = avatarById(student.avatar);
    if(selected) return selected.src;
    if(typeof student.avatar === "string" && student.avatar.includes("/")){
      return student.avatar;
    }
    return "";
  }

  function protectInputs(root){
    if(!root) return;
    root.querySelectorAll("input, button").forEach(element => {
      ["keydown", "keyup", "keypress"].forEach(type => {
        element.addEventListener(type, event => event.stopPropagation());
      });
    });
  }

  function createAvatarGrid(selectedId, onSelect){
    const section = document.createElement("section");
    section.className = "fritz-avatar-section";

    const title = document.createElement("h2");
    title.textContent = "Choose an Academy Avatar";

    const directions = document.createElement("p");
    directions.textContent = "This character will represent the student throughout Fritz Academy.";

    const grid = document.createElement("div");
    grid.className = "fritz-avatar-grid";

    let selected = selectedId || "";

    FRITZ_AVATARS.forEach(avatar => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fritz-avatar-choice";
      button.dataset.avatarId = avatar.id;
      button.setAttribute("aria-label", avatar.label);
      if(avatar.id === selected){
        button.classList.add("is-selected");
      }

      const image = document.createElement("img");
      image.src = avatar.src;
      image.alt = avatar.label;
      image.loading = "lazy";

      const label = document.createElement("span");
      label.textContent = avatar.label.replace("Avatar ", "");

      button.append(image, label);
      button.addEventListener("click", () => {
        selected = avatar.id;
        grid.querySelectorAll(".fritz-avatar-choice").forEach(item => {
          item.classList.toggle("is-selected", item === button);
        });
        if(typeof onSelect === "function") onSelect(avatar.id, avatar);
      });
      grid.appendChild(button);
    });

    section.append(title, directions, grid);
    section.getSelectedAvatar = () => selected;
    return section;
  }

  if(typeof StudentProfileEngine === "undefined"){
    return;
  }

  StudentProfileEngine.prototype.showChooser = function(){
    this.close();

    const students = this.students();
    const activeId = this.activeId();

    this.overlay = document.createElement("div");
    this.overlay.className = "fritz-profile-overlay";

    this.panel = document.createElement("section");
    this.panel.className = "fritz-profile-panel fritz-profile-panel-wide";
    this.panel.setAttribute("role", "dialog");
    this.panel.setAttribute("aria-modal", "true");
    this.panel.setAttribute("aria-label", "Choose a Fritz Academy student");

    const heading = document.createElement("h1");
    heading.textContent = "Fritz Academy";

    const subtitle = document.createElement("p");
    subtitle.className = "fritz-profile-subtitle";
    subtitle.textContent = students.length
      ? "Choose the student who is learning today."
      : "Create the first student profile to begin.";

    const list = document.createElement("div");
    list.className = "fritz-profile-list fritz-profile-list-visual";

    students.forEach(student => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "fritz-profile-card fritz-profile-card-visual";
      if(student.id === activeId) card.classList.add("is-active");

      const portrait = document.createElement("div");
      portrait.className = "fritz-profile-avatar";
      const source = avatarSource(student);
      if(source){
        const image = document.createElement("img");
        image.src = source;
        image.alt = `${student.studentName || "Student"} avatar`;
        portrait.appendChild(image);
      }else{
        portrait.textContent = "⭐";
      }

      const details = document.createElement("div");
      details.className = "fritz-profile-details";
      const name = document.createElement("strong");
      name.textContent = student.studentName || "Academy Student";
      const progress = document.createElement("span");
      progress.textContent = `Current lesson: ${student.currentLevel || "1-A"} • ${Number(student.stars) || 0} stars`;
      const edit = document.createElement("span");
      edit.className = "fritz-profile-edit-hint";
      edit.textContent = source ? "Avatar selected" : "Choose an avatar";
      details.append(name, progress, edit);

      card.append(portrait, details);
      card.addEventListener("click", () => this.select(student.id));
      list.appendChild(card);
    });

    const actions = document.createElement("div");
    actions.className = "fritz-profile-actions";

    const add = document.createElement("button");
    add.type = "button";
    add.className = "fritz-profile-primary";
    add.textContent = "+ Add Student";
    add.addEventListener("click", () => this.showCreateForm());
    actions.appendChild(add);

    if(students.length && activeId){
      const editAvatar = document.createElement("button");
      editAvatar.type = "button";
      editAvatar.className = "fritz-profile-secondary";
      editAvatar.textContent = "Change Selected Avatar";
      editAvatar.addEventListener("click", () => this.showAvatarEditor(activeId));
      actions.appendChild(editAvatar);

      const continueButton = document.createElement("button");
      continueButton.type = "button";
      continueButton.className = "fritz-profile-secondary";
      continueButton.textContent = "Continue with Selected Student";
      continueButton.addEventListener("click", () => this.close());
      actions.appendChild(continueButton);
    }

    this.panel.append(heading, subtitle, list, actions);
    this.overlay.appendChild(this.panel);
    document.body.appendChild(this.overlay);
    protectInputs(this.panel);
  };

  StudentProfileEngine.prototype.showCreateForm = function(){
    if(!this.panel) return;
    this.panel.innerHTML = "";
    this.panel.classList.add("fritz-profile-panel-wide");

    const heading = document.createElement("h1");
    heading.textContent = "Add a Student";

    const directions = document.createElement("p");
    directions.className = "fritz-profile-subtitle";
    directions.textContent = "Create a separate profile and choose the student's Academy avatar.";

    const form = document.createElement("form");
    form.className = "fritz-profile-form";

    const fields = document.createElement("div");
    fields.className = "fritz-profile-fields";

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Student name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.required = true;
    nameInput.maxLength = 80;
    nameInput.autocomplete = "off";
    nameInput.placeholder = "Enter the student's name";

    const languageLabel = document.createElement("label");
    languageLabel.textContent = "Home language (optional)";
    const languageInput = document.createElement("input");
    languageInput.type = "text";
    languageInput.maxLength = 60;
    languageInput.autocomplete = "off";
    languageInput.placeholder = "Example: Mandarin Chinese";

    const ageLabel = document.createElement("label");
    ageLabel.textContent = "Age (optional)";
    const ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.min = "4";
    ageInput.max = "18";
    ageInput.inputMode = "numeric";

    fields.append(nameLabel, nameInput, languageLabel, languageInput, ageLabel, ageInput);

    let selectedAvatar = "";
    const avatarGrid = createAvatarGrid("", avatarId => {
      selectedAvatar = avatarId;
    });

    const message = document.createElement("p");
    message.className = "fritz-profile-error";
    message.setAttribute("aria-live", "polite");

    const actions = document.createElement("div");
    actions.className = "fritz-profile-actions";

    const createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.className = "fritz-profile-primary";
    createButton.textContent = "Create Student";

    const back = document.createElement("button");
    back.type = "button";
    back.className = "fritz-profile-secondary";
    back.textContent = "Back";
    back.addEventListener("click", () => this.showChooser());

    actions.append(createButton, back);
    form.append(fields, avatarGrid, message, actions);

    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = nameInput.value.trim();
      if(!name){
        message.textContent = "Please enter the student's name.";
        nameInput.focus();
        return;
      }
      if(!selectedAvatar){
        message.textContent = "Please choose an Academy avatar.";
        avatarGrid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      try{
        const student = createStudent(name, "", selectedAvatar);
        student.homeLanguage = languageInput.value.trim();
        student.age = ageInput.value ? Number(ageInput.value) : null;
        saveGame(student);
        window.location.reload();
      }catch(error){
        message.textContent = error && error.message
          ? error.message
          : "The student profile could not be created.";
      }
    });

    this.panel.append(heading, directions, form);
    protectInputs(this.panel);
    window.setTimeout(() => nameInput.focus(), 0);
  };

  StudentProfileEngine.prototype.showAvatarEditor = function(studentId){
    if(!this.panel) return;
    const student = this.students().find(item => item.id === studentId);
    if(!student) return;

    this.panel.innerHTML = "";
    this.panel.classList.add("fritz-profile-panel-wide");

    const heading = document.createElement("h1");
    heading.textContent = `Choose ${student.studentName || "Student"}'s Avatar`;

    let selectedAvatar = student.avatar || "";
    const avatarGrid = createAvatarGrid(selectedAvatar, avatarId => {
      selectedAvatar = avatarId;
    });

    const actions = document.createElement("div");
    actions.className = "fritz-profile-actions";

    const save = document.createElement("button");
    save.type = "button";
    save.className = "fritz-profile-primary";
    save.textContent = "Save Avatar";
    save.addEventListener("click", () => {
      if(!selectedAvatar) return;
      if(typeof updateStudentAvatar === "function"){
        updateStudentAvatar(student.id, selectedAvatar);
      }
      window.location.reload();
    });

    const back = document.createElement("button");
    back.type = "button";
    back.className = "fritz-profile-secondary";
    back.textContent = "Back";
    back.addEventListener("click", () => this.showChooser());

    actions.append(save, back);
    this.panel.append(heading, avatarGrid, actions);
    protectInputs(this.panel);
  };

  const originalInjectStyles = StudentProfileEngine.prototype.injectStyles;
  StudentProfileEngine.prototype.injectStyles = function(){
    originalInjectStyles.call(this);
    if(document.getElementById("fritz-avatar-system-styles")) return;

    const style = document.createElement("style");
    style.id = "fritz-avatar-system-styles";
    style.textContent = `
      .fritz-profile-panel-wide { width: min(980px, 96vw); }
      .fritz-profile-list-visual { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
      .fritz-profile-card-visual {
        grid-template-columns: 92px 1fr;
        align-items: center;
        min-height: 120px;
      }
      .fritz-profile-avatar {
        width: 84px;
        height: 84px;
        border-radius: 50%;
        overflow: hidden;
        display: grid;
        place-items: center;
        background: linear-gradient(145deg, #eaf3ff, #fff2bd);
        border: 4px solid #f6c744;
        font-size: 38px;
      }
      .fritz-profile-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
      .fritz-profile-details { display: grid; gap: 5px; }
      .fritz-profile-edit-hint { color: #174ea6; font-weight: 700; }
      .fritz-profile-fields { display: grid; gap: 9px; max-width: 620px; width: 100%; margin: 0 auto 20px; }
      .fritz-avatar-section { margin-top: 12px; }
      .fritz-avatar-section h2 { margin: 6px 0; text-align: center; font-size: 27px; }
      .fritz-avatar-section > p { margin: 0 0 14px; text-align: center; color: #46566f; }
      .fritz-avatar-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 14px;
      }
      .fritz-avatar-choice {
        position: relative;
        min-height: 165px;
        padding: 8px;
        border: 4px solid #c8d2df;
        border-radius: 18px;
        background: #ffffff;
        color: #102342;
        cursor: pointer;
        display: grid;
        grid-template-rows: 1fr auto;
        gap: 7px;
        transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
      }
      .fritz-avatar-choice:hover,
      .fritz-avatar-choice:focus { transform: translateY(-3px); border-color: #174ea6; outline: none; }
      .fritz-avatar-choice.is-selected {
        border-color: #f6c744;
        box-shadow: 0 0 0 4px #174ea6, 0 9px 20px rgba(23,78,166,.25);
        transform: translateY(-3px) scale(1.02);
      }
      .fritz-avatar-choice.is-selected::after {
        content: "✓";
        position: absolute;
        top: 6px;
        right: 7px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #174ea6;
        color: white;
        font-weight: 900;
        font-size: 20px;
      }
      .fritz-avatar-choice img {
        width: 100%;
        height: 118px;
        object-fit: contain;
        object-position: center bottom;
        border-radius: 10px;
        background: linear-gradient(180deg, #eaf5ff 0%, #fff9d9 100%);
      }
      .fritz-avatar-choice span { font-weight: 800; font-size: 15px; }
      @media (max-width: 600px) {
        .fritz-profile-card-visual { grid-template-columns: 72px 1fr; }
        .fritz-profile-avatar { width: 64px; height: 64px; }
        .fritz-avatar-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .fritz-avatar-choice { min-height: 145px; }
        .fritz-avatar-choice img { height: 100px; }
      }
    `;
    document.head.appendChild(style);
  };

  window.FRITZ_AVATARS = FRITZ_AVATARS;
  window.getFritzAvatar = avatarById;
})();