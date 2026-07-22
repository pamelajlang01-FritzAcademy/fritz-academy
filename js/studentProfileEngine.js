/*
====================================================
FRITZ ACADEMY
Student Profile Engine
Version 43.0.0
====================================================

Purpose:
- Show a student chooser at the beginning of every session.
- Create and switch student profiles without mixing progress.
- Keep the existing local save system and lesson engines intact.
*/

class StudentProfileEngine {
  constructor(){
    this.overlay = null;
    this.panel = null;
  }

  start(){
    this.injectStyles();
    this.createSwitchButton();
    this.showChooser();
  }

  students(){
    return typeof listStudents === "function"
      ? listStudents()
      : [];
  }

  activeId(){
    return typeof getActiveStudentId === "function"
      ? getActiveStudentId()
      : "";
  }

  showChooser(){
    this.close();

    const students = this.students();
    const activeId = this.activeId();

    this.overlay = document.createElement("div");
    this.overlay.className = "fritz-profile-overlay";

    this.panel = document.createElement("section");
    this.panel.className = "fritz-profile-panel";
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
    list.className = "fritz-profile-list";

    students.forEach(student => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "fritz-profile-card";

      if(student.id === activeId){
        card.classList.add("is-active");
      }

      const name = document.createElement("strong");
      name.textContent = student.studentName || "Academy Student";

      const progress = document.createElement("span");
      progress.textContent = `Current lesson: ${student.currentLevel || "1-A"} • ${Number(student.stars) || 0} stars`;

      card.append(name, progress);
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
  }

  showCreateForm(){
    if(!this.panel){
      return;
    }

    this.panel.innerHTML = "";

    const heading = document.createElement("h1");
    heading.textContent = "Add a Student";

    const directions = document.createElement("p");
    directions.className = "fritz-profile-subtitle";
    directions.textContent = "Each student receives separate lessons, stars, rewards, builds, and saved progress.";

    const form = document.createElement("form");
    form.className = "fritz-profile-form";

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Student name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.required = true;
    nameInput.maxLength = 40;
    nameInput.autocomplete = "off";
    nameInput.placeholder = "Enter the student's name";

    const languageLabel = document.createElement("label");
    languageLabel.textContent = "Home language (optional)";

    const languageInput = document.createElement("input");
    languageInput.type = "text";
    languageInput.maxLength = 40;
    languageInput.autocomplete = "off";
    languageInput.placeholder = "Example: Mandarin Chinese";

    const ageLabel = document.createElement("label");
    ageLabel.textContent = "Age (optional)";

    const ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.min = "4";
    ageInput.max = "18";
    ageInput.inputMode = "numeric";

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
    form.append(
      nameLabel,
      nameInput,
      languageLabel,
      languageInput,
      ageLabel,
      ageInput,
      message,
      actions
    );

    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = nameInput.value.trim();

      if(!name){
        message.textContent = "Please enter the student's name.";
        nameInput.focus();
        return;
      }

      try{
        const student = createStudent(name);
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
    window.setTimeout(() => nameInput.focus(), 0);
  }

  select(studentId){
    if(typeof selectStudent !== "function"){
      return;
    }

    const selected = selectStudent(studentId);
    if(selected){
      window.location.reload();
    }
  }

  createSwitchButton(){
    if(document.getElementById("fritz-switch-student")){
      return;
    }

    const button = document.createElement("button");
    button.id = "fritz-switch-student";
    button.type = "button";
    button.textContent = "Switch Student";
    button.addEventListener("click", () => this.showChooser());
    document.body.appendChild(button);
  }

  close(){
    if(this.overlay){
      this.overlay.remove();
      this.overlay = null;
      this.panel = null;
    }
  }

  injectStyles(){
    if(document.getElementById("fritz-profile-styles")){
      return;
    }

    const style = document.createElement("style");
    style.id = "fritz-profile-styles";
    style.textContent = `
      .fritz-profile-overlay {
        position: fixed;
        inset: 0;
        z-index: 100000;
        display: grid;
        place-items: center;
        padding: 18px;
        background: rgba(7, 20, 38, 0.92);
      }
      .fritz-profile-panel {
        width: min(720px, 94vw);
        max-height: 90vh;
        overflow: auto;
        box-sizing: border-box;
        padding: 28px;
        border: 5px solid #f6c744;
        border-radius: 24px;
        background: #fffdf5;
        color: #102342;
        box-shadow: 0 24px 70px rgba(0,0,0,.45);
        font-family: Arial, sans-serif;
      }
      .fritz-profile-panel h1 {
        margin: 0 0 8px;
        text-align: center;
        font-size: clamp(30px, 6vw, 46px);
      }
      .fritz-profile-subtitle {
        margin: 0 0 22px;
        text-align: center;
        font-size: 19px;
        line-height: 1.45;
      }
      .fritz-profile-list {
        display: grid;
        gap: 12px;
        margin-bottom: 22px;
      }
      .fritz-profile-card {
        display: grid;
        gap: 5px;
        width: 100%;
        padding: 16px 18px;
        border: 3px solid #c8d2df;
        border-radius: 15px;
        background: white;
        color: #102342;
        text-align: left;
        cursor: pointer;
      }
      .fritz-profile-card strong { font-size: 24px; }
      .fritz-profile-card span { font-size: 16px; }
      .fritz-profile-card:hover,
      .fritz-profile-card:focus,
      .fritz-profile-card.is-active {
        border-color: #174ea6;
        background: #eef5ff;
        outline: none;
      }
      .fritz-profile-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-top: 18px;
      }
      .fritz-profile-primary,
      .fritz-profile-secondary,
      #fritz-switch-student {
        border: 0;
        border-radius: 13px;
        padding: 13px 18px;
        font-weight: 700;
        font-size: 17px;
        cursor: pointer;
      }
      .fritz-profile-primary { background: #f6c744; color: #102342; }
      .fritz-profile-secondary { background: #174ea6; color: white; }
      .fritz-profile-form { display: grid; gap: 9px; }
      .fritz-profile-form label { margin-top: 8px; font-weight: 700; font-size: 17px; }
      .fritz-profile-form input {
        box-sizing: border-box;
        width: 100%;
        padding: 13px;
        border: 2px solid #aab7c8;
        border-radius: 10px;
        font-size: 18px;
      }
      .fritz-profile-error { min-height: 22px; margin: 6px 0 0; color: #a52222; font-weight: 700; }
      #fritz-switch-student {
        position: fixed;
        z-index: 99999;
        top: 12px;
        right: 12px;
        background: #f6c744;
        color: #102342;
        box-shadow: 0 4px 16px rgba(0,0,0,.3);
      }
      @media (max-width: 600px) {
        .fritz-profile-panel { padding: 20px 16px; }
        #fritz-switch-student { top: 8px; right: 8px; padding: 10px 12px; font-size: 14px; }
      }
    `;

    document.head.appendChild(style);
  }
}

window.StudentProfileEngine = StudentProfileEngine;
window.fritzStudentProfiles = new StudentProfileEngine();

window.addEventListener("DOMContentLoaded", () => {
  window.fritzStudentProfiles.start();
});
