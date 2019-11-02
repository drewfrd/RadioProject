async function adjustVolume(
  element,
  newVolume,
  { duration = 1000, easing = swing, interval = 13 } = {}
) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;
  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }
  const ticks = Math.floor(duration / interval);
  let tick = 1;
  return new Promise(resolve => {
    const timer = setInterval(() => {
      element.volume = originalVolume + easing(tick / ticks) * delta;
      if (++tick === ticks) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}
function swing(p) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}
