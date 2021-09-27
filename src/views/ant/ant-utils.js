const linearNumber = (
  start1 = 0,
  end1 = 100,
  start2 = 0,
  end2 = 100,
  value
) => {
  if (value > end2) {
    return end1;
  }
  if (value < start2) {
    return start1;
  }

  return (value / (end2 - start2)) * (end1 - start1) + start1;
};

const distance = (x1, y1, x2, y2) => {
  const a = Math.abs(x1 - x2);
  const b = Math.abs(y1 - y2);
  return Math.sqrt(a * a + b * b);
};

const nearest = (pos, poss) => {
  const { left, top } = pos;
  let nearest = null;
  for (const pp of poss) {
    if (nearest === null) {
      nearest = pp;
    }
    const distanceXCurr = pp.left - left;
    const distanceYCurr = pp.top - top;
    const step1 = Math.max(distanceXCurr, distanceYCurr);

    const distanceXLast = nearest.left - left;
    const distanceYLast = nearest.top - top;
    const step2 = Math.max(distanceXLast, distanceYLast);

    if (step1 < step2) {
      nearest = pp;
    }
  }

  return nearest;
};

const walk = (pos1, pos2, step = 1) => {
  const stepX = pos2.left - pos1.left;
  const stepY = pos2.top - pos1.top;
  let { left, top } = pos1;
  if (stepX > stepY) {
    left = pos1.left + (pos2.left > pos1.left ? step : 0 - step);
    top =
      Math.random() > 0.5
        ? top
        : pos1.top + (pos2.top > pos1.top ? step : 0 - step);
  } else {
    left =
      Math.random() > 0.5
        ? left
        : pos1.left + (pos2.left > pos1.left ? step : 0 - step);
    top = pos1.top + (pos2.top > pos1.top ? step : 0 - step);
  }
  return {
    left,
    top,
  };
};
export default {
  linearNumber,
  nearest,
  walk,
  distance,
};
