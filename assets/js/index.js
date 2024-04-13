document.addEventListener("DOMContentLoaded", function (event) {
  /*-------------------------------swiper------------------------------*/

  new Swiper('.swiper-banner', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 8000,
    },
    allowTouchMove: false,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-20%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
  });

  let swiperAdvantage = new Swiper(".swiper-advantage", {
    loop: true,
    speed: 1500,
    autoplay: {
      enabled: true,
      delay: 0,
      disableOnInteraction: false
    },
    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        this.el.addEventListener('mouseleave', () => {
          if (!document.querySelector('.visibility-modal')) {
            this.autoplay.start();
          }
        });
      }
    },
    breakpoints: {
      0: {
        slidesPerView: 2.5,
        spaceBetween: -30,
      },
      400: {
        slidesPerView: 2.5,
        spaceBetween: -60,
      },
      530: {
        slidesPerView: 2.5,
        spaceBetween: -80,
      },
      743: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      1025: {
        slidesPerView: 5,

        spaceBetween: 70,
      },
    }
  });

  const swiperCorporate = document.querySelectorAll('.swiper-corporate');

  if (swiperCorporate.length > 0) {

    swiperCorporate.forEach(sc => {
      const bn = sc.querySelector('.btn-next');
      const bp = sc.querySelector('.btn-prev');
      new Swiper(sc, {
        speed: 800,
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: -20,
            centeredSlides: true,
          },
          500: {
            slidesPerView: 1,
            spaceBetween: -30,
            centeredSlides: true,
          },
          743: {
            slidesPerView: 2.5,
            spaceBetween: 60,
          },
          1025: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
        navigation: {
          nextEl: bn,
          prevEl: bp,
        },
      });
    })


  }

  new Swiper(".swiper-terrace", {
    speed: 800,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: -20,
        centeredSlides: true,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: -30,
        centeredSlides: true,
      },
      743: {
        slidesPerView: 2.5,
        spaceBetween: 60,
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".swiper-terrace .btn-next",
      prevEl: ".swiper-terrace .btn-prev",
    },
  });
  /*-------------------------------swiper end------------------------------*/

  class Modal {

    constructor(option = {}) {
      this.option = option;
      this.ACTIVE_MODAL = this.option.activeSelectModal ? this.option.activeSelectModal : "visibility-modal";
      this.BUTTON_DATA_NAME = this.option.buttonDataName ? this.option.buttonDataName : "open-modal";
      this.MODAL_DATA_NAME = this.option.modalDataName ? this.option.modalDataName : "modal";
      this.CLOSE_DATA_NAME = this.option.closeDataName ? this.option.closeDataName : "close-modal";
      this.btnAll = document.querySelectorAll(`[data-${this.BUTTON_DATA_NAME}]`);
      this.modal = document.querySelectorAll(`[data-${this.MODAL_DATA_NAME}]`);
      this.open();
      this.close();
    }

    open() {
      if (this.btnAll.length > 0) {
        let newDataName = this._convertString();
        this.btnAll.forEach(b => {
          b.addEventListener('click', () => {
            document.querySelector('.' + this.ACTIVE_MODAL) ? document.querySelector('.' + this.ACTIVE_MODAL).classList.remove(this.ACTIVE_MODAL) : '';
            this.requiredModal = document.querySelector(`[data-${this.MODAL_DATA_NAME}="${b.dataset[newDataName]}"]`);
            if (this.requiredModal) {
              this.requiredModal.classList.add(this.ACTIVE_MODAL);
              this._disableScroll();
              this._copy(b, this.requiredModal);
              swiperAdvantage.autoplay.stop();
            }
          })
        })
      }
    }

    close() {
      if (this.modal.length > 0) {
        this.modal.forEach(m => {
          m.addEventListener('click', (event) => this._hide(event));
        })
      }
    }

    _hide(event) {
      this.btnClose = event.currentTarget.querySelectorAll(`[data-${this.CLOSE_DATA_NAME}]`);
      this.content = event.currentTarget.firstElementChild;

      if (this.btnClose.length > 0) {
        this.btnClose.forEach(c => {
          if (this.content.contains(event.target) && !c.contains(event.target)) {
            return;
          } this._removeVisibility();
          swiperAdvantage.autoplay.start();
          event.target.removeEventListener("click", event => this._hide(event));
        })
      } else {
        if (this.content.contains(event.target)) {
          return;
        }
        swiperAdvantage.autoplay.start();
        this._removeVisibility();
        event.target.removeEventListener("click", event => this._hide(event));
      }
    }

    _removeVisibility() {
      document.querySelector('.' + this.ACTIVE_MODAL) ? document.querySelector('.' + this.ACTIVE_MODAL).classList.remove(this.ACTIVE_MODAL) : '';
      this._enableScroll();
    }

    _disableScroll() {
      let marginSize = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add("lock-scroll");
      document.body.style.marginRight = marginSize + "px";
    }

    _enableScroll() {
      const top = document.body.style.top;
      document.body.classList.remove("lock-scroll");
      document.body.style.top = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
      document.body.style.marginRight = "";
    }

    _convertString() {
      let str = this.BUTTON_DATA_NAME;
      let i = -1;
      while ((i = str.indexOf('-', i + 1)) != -1) {
        str = str.substr(0, i + 1) + str[i + 1].toUpperCase() + str.substr(i + 2);
      }
      str = str.replace(/[\.\-/\\\s]/g, '');
      return str
    }

    _copy(block, modal) {
      let advantageLogo = block.querySelector('.advantage__el-logo');
      let advantageText = block.querySelector('.advantage-content--hidden');

      if (advantageLogo && advantageText) {
        let modalContent = modal.querySelector('.modal-advantage__content');
        modalContent.innerHTML = advantageLogo.innerHTML + advantageText.innerHTML;
      }

    }
  }
  new Modal();

  class Accordion {


    constructor(accordion, setting) {

      this.accordion = typeof accordion === "string" ? document.querySelector(accordion) : accordion;
      this.setting = setting;
      this.#getElements();
      this.#click();
      this.#showPanel();
    }

    #getElements() {
      this.#getBtn();
      this.#getPanel();
    }

    #getBtn() {
      return this.btnAll = typeof this.setting.btn === "string" ? this.accordion.querySelectorAll(this.setting.btn) : this.setting.btn;  //получить все кнопки
    }
    #getPanel() {
      return this.panelAll = typeof this.setting.panel === "string" ? this.accordion.querySelectorAll(this.setting.panel) : this.setting.panel; // получить все панели
    }


    #click() {
      this.btnAll.forEach((el, id) => {
        el.addEventListener('click', () => {
          //если true показывать только одну панель 
          if (this.setting.onlyOnePanel === true) {
            if (this.panelAll[id].style.maxHeight) {
              this.panelAll[id].style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
              return;
            }
            this.panelAll.forEach((p, id) => {
              p.style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
            });
            this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.btnAll[id].classList.add('active');
          } else {
            if (this.panelAll[id].style.maxHeight) {
              this.panelAll[id].style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
            } else {
              this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
              this.btnAll[id].classList.add('active');
            }
          }
        })
      });
    }

    #showPanel() {
      // открытая панель
      if (this.setting.showPanel) {
        const counter = this.setting.showPanel - 1;
        this.panelAll.forEach((p, id) => {
          if (counter === id) {
            p.style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.btnAll[id].classList.add('active');
          }
        });
      }
    }
  }

  if (window.innerWidth < 1024) {
    new Accordion('.about__grid', {
      panel: '.about__el-back',
      btn: '.about__el-front',
      onlyOnePanel: true,        // открывать только одну
      showPanel: 0,               // выбираем открытую панель
    })
  }

  const accordion_gallery = document.querySelector('.accordion-gallery');
  if (accordion_gallery) {
    new Accordion(accordion_gallery, {
      panel: '.accordion-gallery__panel',
      btn: '.accordion-gallery__btn',
      onlyOnePanel: true,        // открывать только одну
      showPanel: 0,               // выбираем открытую панель
    })
  }
  class DropDownList {

    constructor(dropDown, setting) {
      this.dropDown = dropDown;
      this.setting = setting
      this._getElements();
      this._click();
      if (this.setting.closeWindow === true) {
        this._closeWindow()
      }
    }

    _getElements() {
      this._getBtn();
      this._getPanel();
    }

    _getBtn() {
      return this.btn = typeof this.setting.btn === "string" ? this.dropDown.querySelector(this.setting.btn) : this.setting.btn; //получить кнопки
    }
    _getPanel() {
      return this.panel = typeof this.setting.panel === "string" ? this.dropDown.querySelector(this.setting.panel) : this.setting.panel; // получить панели
    }

    _click() {
      this.btn.addEventListener('click', () => {
        if (this.panel.classList.contains('active')) {
          this.dropDown.classList.remove('active');
          this.panel.classList.remove('active');
        } else {
          this.dropDown.classList.add('active');
          this.panel.classList.add('active');
        }
      })
    }
    _closeWindow() {
      this.dropDown.addEventListener('click', () => {
        document.addEventListener("click", event => {
          this._hide(event);
        });
      })
    }
    _hide(event) {
      if (this.dropDown.contains(event.target))
        return;
      this.dropDown.classList.remove('active');
      this.panel.classList.remove('active');
      document.removeEventListener("click", event => {
        this._hide(event);
      });
    }
  }

  let dropdown = document.querySelector('.dropdown');

  if (dropdown) {

    new DropDownList(dropdown, {
      panel: '.dropdown__panel',
      btn: '.dropdown__btn',
      closeWindow: false, // не обязательно, закрывать панель при клике вне блока
    })

    const timeBtn = dropdown.querySelectorAll('.modal-form__drop-time');
    const res = dropdown.querySelector(".result-time");
    const input = dropdown.querySelector("input");
    timeBtn.forEach(b => {
      b.addEventListener("click", () => {
        res.textContent = b.textContent;
        input.value = b.textContent;
      })
    })

  }

  const Menu = {
    btn: document.querySelector('.burger'),
    menu: document.querySelector('.menu'),
    menuWrap: document.querySelector('.menu__wrap'),
    nav: document.querySelector('.header nav'),

    addEventListener() {
      if (this.btn || this.menu) {
        this.btn.addEventListener("click", () => {
          this.btn.classList.toggle('active');
          this.menu.classList.toggle('active');
          this.nav.classList.toggle('active');
          this.btn.classList.contains('active') ? this._disableScroll() : this._enableScroll();
        })

        this._close();
      }
    },



    _disableScroll() {
      let marginSize = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add("lock-scroll");
      document.documentElement.style.marginRight = marginSize + "px";
    },

    _enableScroll() {
      const top = document.body.style.top;
      document.body.classList.remove("lock-scroll");
      window.scrollTo(0, parseInt(top || '0') * -1);
      document.documentElement.style.marginRight = "";
    },

    _hide(event) {

      if (this.menuWrap.contains(event.target)) {
        return;
      }

      this.closeMenu();
      event.target.removeEventListener("click", event => this._hide(event));

    },

    _close() {
      if (this.menu) {
        this.menu.addEventListener('click', (event) => this._hide(event));
      }
    },

    closeMenu() {
      this.btn.classList.remove('active');
      this.menu.classList.remove('active');
      this.nav.classList.remove('active');
      this._enableScroll();
    }


  }

  Menu.addEventListener();

  const Anchors = {
    anchors: document.querySelectorAll("a[href*='#']"),

    scrollIntoView() {
      if (this.anchors.length > 0) {
        for (let anchor of this.anchors) {
          anchor.addEventListener('click', function (ev) {
            ev.preventDefault();
            Menu.closeMenu();
            const blockID = anchor.getAttribute('href').substr(1);
            const block = document.getElementById(blockID);
            if (block) {
              const offsetTop = block.getBoundingClientRect().top + window.pageYOffset - 100;
              window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
              })
              if (blockID === 'form') {
                let input = document.getElementById('name');
                setTimeout(() => {
                  input.focus();
                }, 300)

              }
            }
          })
        }
      }


    }

  }

  Anchors.scrollIntoView();

  /*-------------------------------animation------------------------------*/
  let observer = new IntersectionObserver(onEntry, { threshold: [0.3] });
  let elements = document.querySelector('.present');

  if (elements) {
    observer.observe(elements);
  }

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {

        const present_1 = document.querySelector('.present__amulet-1');
        const present_2 = document.querySelector('.present__amulet-2');
        const diameter = document.querySelector('.diameter');
        const alloy = document.querySelector('.alloy');
        const material = document.querySelector('.material');
        const rus = document.querySelector('.rus');
        const weight = document.querySelector('.weight');

        setTimeout(() => { present_1.classList.remove('hide'); }, 600)
        setTimeout(() => { present_2.classList.remove('hide'); }, 200)
        setTimeout(() => { diameter.classList.remove('hide'); }, 900)
        setTimeout(() => { alloy.classList.remove('hide'); }, 1200)
        setTimeout(() => { material.classList.remove('hide'); }, 1500)
        setTimeout(() => { rus.classList.remove('hide'); }, 1800)
        setTimeout(() => { weight.classList.remove('hide'); }, 2100)
      }
    });
  }

  tab('.menu-bar__food');
  tab('.menu-bar__drink');

  const enter = document.querySelector('.enter');
  const hall = document.querySelector('.hall');
  const scheme = document.querySelector('.scheme');

  if (enter && hall && scheme) {
    const entrance__btn = document.querySelector('.entrance__btn');
    const hall__btn_back = document.querySelector('.hall__btn-back');
    const hall__btn_go = document.querySelector('.hall__btn-go');
    const scheme__back_btn = document.querySelector('.scheme__back-btn');

    entrance__btn.addEventListener('click', () => {
      enter.classList.remove('active');
      hall.classList.add('active');
    })
    hall__btn_back.addEventListener('click', () => {
      enter.classList.add('active');
      hall.classList.remove('active');
    })

    hall__btn_go.addEventListener('click', () => {
      hall.classList.remove('active');
      scheme.classList.add('active');
    })

    scheme__back_btn.addEventListener('click', () => {
      hall.classList.add('active');
      scheme.classList.remove('active');
    })
  }

  /*---------------------------------form---------------------------------*/
  let formContract = document.querySelector('.form')
  if (formContract) {

    formContract.addEventListener("submit", (ev) => {
      ev.preventDefault();

      let name = ev.target.querySelector("input[name='name']");
      let tel = ev.target.querySelector("input[name='tel']");
      let age = ev.target.querySelector("input[name='age']");


      if (name.value === "") {
        name.classList.add('error');
        return;
      } else {
        name.classList.remove('error');

      }

      if (tel.value.length < 6) {
        tel.classList.add('error');
        return;
      } else {
        tel.classList.remove('error');

      }

      if (age.value === "") {
        age.classList.add('error');

        return;
      } else {
        age.classList.remove('error');

      }

      const formData = new FormData(formContract);

      formContract.classList.add('active')

    })

  }

  let modalForm = document.querySelector('.modal-form')
  if (modalForm) {

    modalForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      let name = ev.target.querySelector("input[name='name']");
      let tel = ev.target.querySelector("input[name='tel']");
      let date = ev.target.querySelector("input[name='date']");
      let time = ev.target.querySelector("input[name='time']");

      if (name.value === "") {
        name.classList.add('error');
        return;
      } else {
        name.classList.remove('error');

      }

      if (tel.value.length < 6) {
        tel.classList.add('error');
        return;
      } else {
        tel.classList.remove('error');

      }

      if (date.value === "") {
        date.classList.add('error');

        return;
      } else {
        date.classList.remove('error');

      }

      const formData = new FormData(formContract);


      modalThank(name, date, time, ev.target)

    })
  }

  const formPageThank = document.querySelector('.form-page__thank');
  if (formPageThank) {
    formPageThank.addEventListener('click', () => {
      formContract.classList.remove('active')
    })
  }

  const formCounter = document.querySelector('.js-counter');
  if (formCounter) {

    const btnPlus = formCounter.querySelector('.plus');
    const btnMinus = formCounter.querySelector('.min');
    const inputCounter = formCounter.querySelector('input');

    btnPlus.addEventListener('click', () => {
      inputCounter.value++
    })

    btnMinus.addEventListener('click', () => {
      if (inputCounter.value <= 1) {
        return;
      }
      inputCounter.value--
    })




  }
  /*-----------------------*/

  const inputTel = document.querySelectorAll('input[type="tel"]');
  if (inputTel.length > 0) {
    inputTel.forEach(el => {
      el.addEventListener('click', () => {
        el.value = "+7"
      })
    })
  }

});

function modalThank(nameInput, dateInput, timeInput, form) {

  let newDate = new Date(dateInput.value).toLocaleDateString('ru-RU');
  document.querySelector('.js-name').textContent = nameInput.value;
  document.querySelector('.js-time').textContent = timeInput.value;
  document.querySelector('.js-date').textContent = newDate;
  const modalThank = document.querySelector('.js-modal-thank');
  modalThank.style.display = 'flex';
  form.style.display = 'none';
}


function tab(select) {
  const menu = document.querySelector(select);
  if (menu) {
    const btnAll = menu.querySelectorAll("[data-tab]");
    const menuTab = menu.querySelector('.menu-bar__tabs');
    const initTab = menu.querySelector('.tab-active');

    if (initTab) {
      menuTab.scrollLeft = menuTab.scrollLeft + (initTab.getBoundingClientRect().x - menuTab.getBoundingClientRect().width / 2 + initTab.getBoundingClientRect().width / 2);
    }
    scrollTab(menuTab);
    btnAll.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const tabContent = menu.querySelector(`[data-tab-content=${ev.currentTarget.dataset.tab}]`)
        menu.querySelector('.tab-active') ? menu.querySelector('.tab-active').classList.remove('tab-active') : '';
        menu.querySelector('.tab-content-active') ? menu.querySelector('.tab-content-active').classList.remove('tab-content-active') : '';
        btn.classList.add('tab-active');
        tabContent.classList.add('tab-content-active');
        let scrollLeftMenu = menuTab.scrollLeft + (ev.currentTarget.getBoundingClientRect().x - menuTab.getBoundingClientRect().width / 2 + ev.currentTarget.getBoundingClientRect().width / 2);
        menuTab.scrollLeft = scrollLeftMenu;
      })
    })
  }
}

function scrollTab(menuTab) {
  let speed = 2; // Скорость скролла.
  let left = 0; // отпустили мышку - сохраняем положение скролла
  let drag = false;
  let coorX = 0; // нажали мышку - сохраняем координаты.
  menuTab.addEventListener('mousedown', function (e) {
    drag = true;
    coorX = e.pageX - this.offsetLeft;
  });
  document.addEventListener('mouseup', function () {
    drag = false;
    left = menuTab.scrollLeft;
  });
  menuTab.addEventListener('mousemove', function (e) {
    if (drag) {
      this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX) * speed;
    }
  });
}

// блокирует скролл
function disableScroll() {
  let marginSize = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.right = marginSize + "px";
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add("lock-scroll");
}

// разблокирует скролл
function enableScroll() {
  const top = document.body.style.top;
  document.body.classList.remove("lock-scroll");
  window.scrollTo(0, parseInt(top || '0') * -1);
  document.body.style.right = '';
}