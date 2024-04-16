const BREAKPOINT = 720;

const select = document.getElementById("product-select");
const options = select.querySelectorAll(".select__radio-button");
const table = document.querySelector(".price-table");

const tableTree = parseTable(table);

initialize();

function initialize() {
  options.forEach((option, index) => {
    option.addEventListener("input", () => collapseColumnsExcept(index));
  });

  window.addEventListener("resize", renderTable);

  renderTable();
}

function renderTable() {
  if (window.screen.width < BREAKPOINT) {
    renderSelectedColumn();
  } else {
    renderAll();
  }
}

function renderAll() {
  const elementsToShow = table.querySelectorAll(`td, thead th`);

  elementsToShow.forEach((el) => el.classList.remove("hidden"));
}

function hideAll() {
  const elementsToShow = table.querySelectorAll(`td, thead th:not(:first-child)`);

  elementsToShow.forEach((el) => el.classList.add("hidden"));
}

function renderSelectedColumn() {
  const checkedOptionIndex = Array.from(options).findIndex((option) => option.checked);

  collapseColumnsExcept(checkedOptionIndex);
}

function collapseColumnsExcept(columnToShowIndex) {
  hideAll();

  tableTree.forEach((row) => {
    const cellToShowData = row[columnToShowIndex + 1];

    cellToShowData.el.classList.remove("hidden");
  });
}

function parseTable(tableNode) {
  let rowEls = tableNode.querySelectorAll("thead tr, tbody tr");

  let matrix = [];

  for (let i = 0, n = rowEls.length; i < n; i++) {
    let rowEl = rowEls[i];
    let cellEls = rowEl.querySelectorAll("td, th");
    let y = 0;

    for (let j = 0, m = cellEls.length; j < m; j++) {
      let cellEl = cellEls[j];
      let rowSpan = parseInt(cellEl.getAttribute("rowspan") || 1);
      let cellSpan = parseInt(cellEl.getAttribute("colspan") || 1);
      let rowSpanIterator = rowSpan;

      while (rowSpanIterator--) {
        let cellSpanIterator = cellSpan;

        while (cellSpanIterator--) {
          let x = i + rowSpanIterator;

          matrix[x] = matrix[x] || [];
          matrix[x][y + cellSpanIterator] = {
            el: cellEl,
            existsInDOM: cellSpanIterator === 0 ? true : false,
          };
        }
      }

      y += cellSpan;
    }
  }

  return matrix;
}
