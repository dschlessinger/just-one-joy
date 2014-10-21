var setBackground = function() {
  date = new Date().getDate()
  background = '../background-images/' + date + '.jpeg'
  document.body.style.backgroundImage="url(" + background + ")"
};

setBackground();