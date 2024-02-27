new HimaQuery("$0", (bridge) => {
  return {
    ldb: window.localStorage,
  };
});

var switchRotate = 0;
var currentSelector;
var config = {
  defaultMode: "light",
  colorAccent: "#0099ff",
  themes: {
    dark: {
      colorAccent: "#0099ff",
      primary: "#313131",
      secondary: "#3f3f3f",
      header: "#3f3f3f",
      shadow: "#00000033",
      font: "#dddddd",
    },
    light: {
      colorAccent: "#0099ff",
      primary: "#ffffff",
      header: "linear-gradient(to bottom, #0099ff, #00ddff)",
      secondary: "#ffffff",
      shadow: "#00000022",
      font: "#3f3f3f",
    },
  },
};

setInterval(function () {
  let root = document.querySelector(":root").style;
  // pushing defaults to browser storage
  if (!$0().ldb.getItem("defaultMode")) {
    $0().ldb.setItem("defaultMode", config.defaultMode);
  }
  if (!$0().ldb.getItem("colorAccent")) {
    $0().ldb.setItem("colorAccent", config.colorAccent);
  }
  // keep css variables up to date
  let themeConfig = config.themes[$0().ldb.defaultMode];
  for (let property in themeConfig) {
    root.setProperty(`--${property}`, themeConfig[property]);
  }
  $0("head > #themeColor").content = themeConfig.primary;
  // search listener
  var match = $0("#search").value;
  $0("#list > li", true).forEach((item) => {
    if (item.innerHTML.toUpperCase().includes(match.toUpperCase())) {
      item.show();
    } else {
      item.hide();
    }
  });
}, 10);
$0(".fa-moon").on("click", () => {
  if ($0().ldb.defaultMode == "light") {
    $0().ldb.defaultMode = "dark";
  } else {
    $0().ldb.defaultMode = "light";
  }
});
$0(".switch").on("click", () => {
  switchRotate = switchRotate + 90;
  $0(".switch").style.transform = `rotate(${switchRotate}deg)`;
  var bridge = $0(".from-selector").value;
  $0(".from-selector").value = $0(".to-selector").value;
  $0(".to-selector").value = bridge;
  bridge = $0(".from-selector").dataset.iso;
  $0(".from-selector").dataset.iso = $0(".to-selector").dataset.iso;
  $0(".to-selector").dataset.iso = bridge;
});
$0(".selector", true).forEach((selector) => {
  selector.on("click", () => {
    currentSelector = selector;
    $0("#currency-picker").show();
  });
});

async function exchange() {
  $0("#to").value = "loading...";
  var from = $0(".from-selector").dataset.iso;
  var to = $0(".to-selector").dataset.iso;
  var amount = $0("#from").value > 0 ? $0("#from").value : 1;
  var response = await fetch(`https://currency-api-tdim.vercel.app/${from}/${to}?amount=` + amount);
  if (response.ok) {
    let output = "";
    let data = await response.json();
    let result = Number(data.result);
    let amount = Number(data.amount);
    if (result == amount) {
      output = `1 ${from} = ${result} ${to}`;
    } else {
      output = `${amount} ${to} ~ 1 ${from} = ${result} ${to}`;
    }
    $0("#to").value = output;
  } else {
    alert("Please check your connection!");
  }
}
function setCurrency(label) {
  currentSelector.value = label;
  currentSelector.dataset.iso = label.split(" ")[0];
  $0("#currency-picker").hide();
  $0("#search").value = "";
}
$0().on("DOMContentLoaded", async () => {
  var response = await fetch("assets/res/currencies.json");
  if (response.ok) {
    labels = await response.json();
    labels.forEach((label) => {
      $0("#list").innerHTML += `<li onclick="setCurrency('${label}')">${label}</li>`;
    });
  } else {
    console.error(response);
  }
});
