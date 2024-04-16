const pointWrappers = document.querySelectorAll(".map__point-wrapper");
const warehouses = document.querySelectorAll(".warehouse");

warehouses.forEach((warehouse) => {
  const city = warehouse.dataset.city;
  const pointWrapper = Array.from(pointWrappers).find((pointWrapper) => pointWrapper.dataset.city === city);
  const tooltip = pointWrapper.querySelector(".map__point-tooltip");

  warehouse.addEventListener("mouseenter", () => {
    tooltip.classList.add("active");
  });

  warehouse.addEventListener("mouseleave", () => {
    tooltip.classList.remove("active");
  });
});

pointWrappers.forEach((pointWrapper) => {
  const city = pointWrapper.dataset.city;
  const warehouse = Array.from(warehouses).find((warehouse) => warehouse.dataset.city === city);

  pointWrapper.addEventListener("mouseenter", () => {
    warehouse.classList.add("active");
  });

  pointWrapper.addEventListener("mouseleave", () => {
    warehouse.classList.remove("active");
  });
});

const map = document.querySelector(".map");
const mapSection = document.querySelector(".warehouses-map-section");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 990) {
    const from = 5;
    const to = 65;

    if (elementInViewport(mapSection)) {
      const blockStart = mapSection.offsetTop;
      const blockHeight = mapSection.offsetHeight / 2;
      const currentViewPoint = window.scrollY;

      const percentOfScrolledWay = ((currentViewPoint - blockStart) * 100) / blockHeight;
      const newTop = ((to - from) * percentOfScrolledWay) / 100 + from;

      map.style.top = newTop > to ? map.style.top : newTop + "%";
    }
  }
});

function elementInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.scrollY &&
    left < window.scrollX + window.innerWidth &&
    top + height > window.scrollY + window.innerHeight / 1.5 &&
    left + width > window.scrollX
  );
}
