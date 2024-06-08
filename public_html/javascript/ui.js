// This file will be managing the user interface changes
export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.style.fontSize = "12px";
  personalCodeParagraph.innerHTML = personalCode;
};
