const createShips = (shipTypes) => {
  const shipsContainer = document.createElement("div");
  shipsContainer.className = "flex flex-col";

  shipTypes.forEach((shipType) => {
    const shipElement = document.createElement("ul");
    shipElement.className = "flex flex-row";
    shipElement.id = "ship";
    shipElement.dataset.shipType = shipType.name;
    shipElement.draggable = true;

    for (let i = 0; i < shipType.length; i++) {
      const shipCell = document.createElement("li");
      shipCell.className = "w-10 h-10 border border-black bg-slate-400";
      shipElement.appendChild(shipCell);
    }
    shipsContainer.appendChild(shipElement);
  });

  return shipsContainer;
};

const addShips = (parentElement, shipTypes) => {
  parentElement.appendChild(createShips(shipTypes));
};

export default addShips;
