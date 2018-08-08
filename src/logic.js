// Fn used to calculate the a user's new elo score after a quiz is complete
const calcNewElo = (ELOold, ELOopp, winner, multiplier = 200) => {
  // Equation is based on chess ELO system described here: http://gobase.org/studying/articles/elo/
  // Equation: ELOnew = ELOold + multiplier*(score - expectedScore)
  const score = winner ? 1 : 0;
  const expectedScore = ELOold / (ELOold + ELOopp);
  const ELOnew = ELOold + multiplier * (score - expectedScore);
  return Math.round(ELOnew);
};


module.exports = { calcNewElo };
