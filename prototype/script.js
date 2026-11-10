const form = document.getElementById("leadForm");
const note = document.getElementById("leadNote");
const defaultNote = note.innerHTML;

const validators = {
  name: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone: (v) => /^[6-9]\d{9}$/.test(v.trim()),
};

const messages = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid 10-digit mobile number.",
};

form.phone.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
});

form.addEventListener("input", (e) => {
  e.target.closest(".field")?.classList.remove("is-invalid");
  if (note.classList.contains("is-error")) {
    note.className = "lead__note";
    note.innerHTML = defaultNote;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const invalid = Object.keys(validators).filter((k) => !validators[k](form[k].value));
  form.querySelectorAll(".field").forEach((f) => f.classList.remove("is-invalid"));

  if (invalid.length) {
    invalid.forEach((k) => form[k].closest(".field").classList.add("is-invalid"));
    form[invalid[0]].focus();
    note.className = "lead__note is-error";
    note.textContent = messages[invalid[0]];
    return;
  }

  const button = form.querySelector("button");
  const label = button.querySelector(".btn__label");
  button.disabled = true;
  label.textContent = "Connecting…";

  // TODO: replace with the real endpoint that triggers the demo call.
  await new Promise((r) => setTimeout(r, 900));

  label.textContent = "Calling you now";
  note.className = "lead__note is-success";
  note.innerHTML = `<span class="live-dot" aria-hidden="true"></span> Thanks, ${form.name.value.trim().split(" ")[0]}! Pick up — your AI agent is dialing +91 ${form.phone.value}.`;
});
