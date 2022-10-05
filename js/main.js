function randomInt(min, max) {
  if (max < min || min < 0 || max == min)
  {
    return "Неправильно задан диапазон";
  }
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function checkLength(str,max)
{
 let len = str.length;
 if (len <= max) return true;
 return false;
}

