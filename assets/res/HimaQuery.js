function HimaQuery(name, plugs) {
  window[name] = (tagQuery, data) => {
    let actions = (bridge) => {
      let MainPlugs = {
        on: (event, callback, target = bridge) => {
          target.addEventListener(event, callback);
        },
        show: (e = "") => {
          bridge.style.display = e;
        },
        hide: () => {
          bridge.style.display = "none";
        }
      };
      MainPlugs = plugs ? Object.assign(MainPlugs, plugs(bridge)) : MainPlugs;
      return MainPlugs;
    };
    if (
      tagQuery &&
      (data || data === 0 || data === undefined || data === false)
    ) {
      let dataType = typeof data;
      if (dataType == "number") {
        tagQuery = document.querySelectorAll(tagQuery)[data];
        if (tagQuery) {
          tagQuery = Object.assign(tagQuery, actions(tagQuery));
        } else {
          tagQuery = undefined;
        }
      } else if (dataType == "boolean" && data == true) {
        tagQuery = document.querySelectorAll(tagQuery);
        tagQuery.forEach((perTag) => {
          perTag = Object.assign(perTag, actions(perTag));
        });
      } else if (dataType == "string") {
        tagQuery = document.querySelectorAll(tagQuery)[0];
        tagQuery.value = tagQuery.innerHTML = data;
        tagQuery = Object.assign(tagQuery, actions(tagQuery));
      } else if (dataType == "object") {
        tagQuery = document.querySelectorAll(tagQuery)[data[0]];
        tagQuery.value = tagQuery.innerHTML = data[1];
        tagQuery = Object.assign(tagQuery, actions(tagQuery));
      } else {
        tagQuery = document.querySelectorAll(tagQuery)[0];
        tagQuery = Object.assign(tagQuery, actions(tagQuery));
      }
      return tagQuery;
    } else {
      return Object.assign(window, actions(window));
    }
  };
}
