import DisplayController from "./modules/controllers/displayController";

const app = () => {
  const display = new DisplayController();
  display.loadPage();
};

export default app;
