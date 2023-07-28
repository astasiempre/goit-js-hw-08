import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');
const localStorageKey = 'videoplayer-current-time';


const saveCurrentTime = (time) => {
  localStorage.setItem(localStorageKey, time);
};


const loadAndSetCurrentTime = () => {
  const currentTime = localStorage.getItem(localStorageKey);
  if (currentTime) {
    vimeoPlayer.setCurrentTime(parseFloat(currentTime));
  }
};


const onTimeUpdate = throttle((event) => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
}, 1000);


vimeoPlayer.ready().then(() => {
  loadAndSetCurrentTime();
  vimeoPlayer.on('timeupdate', onTimeUpdate);
});
