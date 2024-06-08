//============================================================================//
// This file will be managing the user interface
export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.style.fontSize = "11px";
  personalCodeParagraph.innerHTML = personalCode;
};
//============================================================================//
