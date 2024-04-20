var guess = [];
var buttons = document.getElementById('buttons').querySelectorAll('button');
var counter = 1;
var incorrectAttempt = false;
const colors = {
  'gold': ['string', 'boolean', 'float', 'integer'],
  'lightgreen': ['cpu', 'ram', 'gpu', 'ssd'],
  'lightskyblue': ['ti', 'dell', 'apple', 'intel'],
  'mediumpurple': ['sound', 'network', 'bluetooth', 'video']
};
function setUpButtonEventListeners() {
  buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      var target = event.target;
      if (target.tagName.toLowerCase() === 'button') {
        if (guess.includes(target.id)) {
          guess = guess.filter(id => id !== target.id);
          target.style.backgroundColor = '';
        } else {
          if (guess.length < 4) {
            guess.push(target.id);
            target.style.backgroundColor = 'gray';
            if (guess.length === 4) {
              document.getElementById('submit').style.display = 'block';

            }
          }
        }
      }
    });
  });
}
setUpButtonEventListeners();

document.getElementById('submit').addEventListener('click', function() {
  var correctColor = false;
  for (const color in colors) {
    if (colors[color].every(value => guess.includes(value))) {
      correctColor = true;
      colors[color].forEach(function(id) {
        var button = document.getElementById(id);
        button.style.backgroundColor = color;
        button.classList.add('fade-out');
        button.addEventListener('transitionend', function() {
          button.style.display = 'none';
        });
      });
      document.getElementById(color).style.display = 'block';
      document.getElementById(color).disabled = true;
      document.getElementById(color).style.backgroundColor = color;
    }
  }
  if (!correctColor) {
    if (!incorrectAttempt) {
      buttons.forEach(function(button) {
        button.style.backgroundColor = '#efefe6ff';
        button.disabled = false;
      });
      
      if (counter != 4) {
        if (4 - counter == 1) {
          alert("Try again! You have 1 attempt left.");
        }
        else {
           alert("Try again! You have " + (4 - counter) + " attempts left.");
        }
         counter += 1;
        }
        
      
      else {
        incorrectAttempt = false;
        alert('You lose!');
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('gold').style.display = 'block';
        document.getElementById('gold').style.backgroundColor = 'gold';

        document.getElementById('lightgreen').style.display = 'block';
        document.getElementById('lightgreen').style.backgroundColor = 'lightgreen';
        document.getElementById('lightskyblue').style.display = 'block';
        document.getElementById('lightskyblue').style.backgroundColor = 'lightskyblue';
        document.getElementById('mediumpurple').style.display = 'block';
        document.getElementById('mediumpurple').style.backgroundColor = 'mediumpurple';
      }
      }
    }
  guess = [];
  document.getElementById('submit').style.display = 'none';
});
