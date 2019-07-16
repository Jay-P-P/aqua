let previousScrollPosition = window.scrollY;

let animationsShown = {
  definitionAnimationShown: false,
  aquariumAnimationShown: false
};

let hero = document.querySelector('.hero');

let aquariums = [...document.querySelector('.aquarium-container').children];

function showDefinition() {
  animationsShown['definitionAnimationShown'] = true;
  let definition = document.querySelector('.definition');
  definition.children[0].style = 'opacity: 1; transform: translateY(0);';
  setTimeout(function() {
    definition.children[1].style = 'transform: scale(1);';
  }, 500);
}

function showAquariums() {
  animationsShown['aquariumAnimationShown'] = true;
  let timeout = 0;
  aquariums.forEach(function(aquarium) {
    timeout += 200;

    let [location] = aquarium.getElementsByClassName('location');

    setTimeout(function() {
      aquarium.classList.add('aquariums-enter');

      let [camContainer] = aquarium.getElementsByClassName('cams-container');
      let liveCams = [...camContainer.children];

      let camTimeout = timeout + 200;
      liveCams.forEach(cam => {
        camTimeout += 100;
        setTimeout(() => {
          cam.style.opacity = 1;
          cam.addEventListener('mouseover', function() {
            aquarium.style.backgroundImage = `url(${
              cam.children[0].currentSrc
            })`;
            aquarium.style.color = 'white';
            location.style.color = 'white';
            aquarium.style.backgroundSize = `${aquarium.clientWidth}px ${
              aquarium.clientHeight
            }px`;
          });

          camContainer.addEventListener('mouseleave', function() {
            aquarium.style.background = 'white';
            location.style.color = '#777';
            aquarium.style.color = 'black';
          });
        }, camTimeout);
      });
    }, timeout);
  });
}

window.addEventListener('scroll', function(e) {
  previousScrollPosition = window.scrollY;

  if (
    animationsShown['definitionAnimationShown'] === false &&
    previousScrollPosition >= hero.offsetHeight / 2
  ) {
    showDefinition();
  }

  if (
    animationsShown['aquariumAnimationShown'] === false &&
    previousScrollPosition >= hero.offsetHeight
  ) {
    showAquariums();
  }
});
