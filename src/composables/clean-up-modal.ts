import type { Modal } from "bootstrap";

export const useCleanUpModal = (modal?: Modal) => {
  const modalBackDrops = document.body.getElementsByClassName("modal-backdrop");

  for (let modal = 0; modal < modalBackDrops.length; modal++) {
    const modalEl = modalBackDrops[modal];
    console.log(modalEl);
    document.body.removeChild(modalEl);
  }

  if (modal) {
    console.log(modal);
    modal.hide();
    modal.dispose();
  }
};
