import debounce from "lodash/debounce";
export default class eventClass {
  handler = null
  clcikEvents = {}

  constructor(Vue) {
    this.Vue = Vue
    this.install()
  }

  install() {
    let { Vue } = this
    let me = this
    const scrolling = Vue.observable({ scrolling: {} });
    Object.defineProperty(Vue.prototype, '$Scroll', {
      get() { return scrolling.scrolling; },
      set(value) { scrolling.scrolling = value; }
    });
    // let ScrollValue = me.isScrolling();
    Vue.set(Vue.prototype, '$Scroll', true);

    const handler =
      debounce((function () {
        let ScrollingValu = me.isScrolling();
        Vue.set(Vue.prototype, '$Scroll', ScrollingValu)
      }), 10)
    this.handler = handler
  }
  startEvent() {
    let { Vue } = this
    window.removeEventListener("scroll", this.handler);
    let me = this
    let ScrollValue = me.isScrolling();
    Vue.set(Vue.prototype, '$Scroll', ScrollValue);
    window.addEventListener("scroll", this.handler);
  }

  endListen() {
    let { Vue } = this
    Vue.set(Vue.prototype, '$Scroll', true);
    window.removeEventListener("scroll", this.handler);
  }

  isScrolling() {
    if (window.scrollY > 1) {
      return true;
    } else {
      return false;
    }
  }
  pauseEvent() {
    window.removeEventListener("scroll", this.handler);
  }

  restartEvent() {
    window.addEventListener("scroll", this.handler);
  }


  startClickEvent(id, func) {
    this.clcikEvents[id] = {
      id: id,
      func: func,
    }
    let element = document.getElementById(id)
    if (element) {
      element.addEventListener("click", func);
    }
  }
  endClickEvent(elemntId) {
    let { id, func } = this.clcikEvents[elemntId]
    let element = document.getElementById(id)
    if (element) {
      element.removeEventListener("click", func);
    }
  }
}