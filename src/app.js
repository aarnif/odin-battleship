import DisplayController from "./modules/controllers/displayController";

const app = () => {
  const display = new DisplayController();
  display.loadNewGame();
};

export default app;
