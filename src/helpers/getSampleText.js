function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createSampler() {
  let strings = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "Sphinx of black quartz, judge my vow.",
    "Jackdaws love my big sphinx of quartz.",
    "The five boxing wizards jump quickly.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "Amazingly few discotheques provide jukeboxes.",
    "While waxing parquet decks, Sly Jim frequently gazed above.",
    "Jumpy felines vex bad dogs with quirky zest.",
    "Six big oxen jump quickly from a wooden raft.",
    "Bright vixens jump; dozy fowl quack.",
    "Just keep buying six packs of zebra vodka.",
    "Quaint glass jugs froth with mixed berry punch.",
    "Big ferns wave as quirky ducks jog excitedly.",
    "A hefty boxer jumps quickly with zest and vigor.",
    "Jumping lizards vex bad dogs with quirky zest.",
    "Mixing four dozen plums vex bad joggers quickly.",
    "Watch five gray fox cubs jump and do tricks.",
    "Giant zebras quickly vex jumpy dogs with flair.",
    "Dizzy owls jump quickly for bright hex gems.",
    "Boxers with jazz hands quickly vex dumpy frogs.",
    "Jolly hawks vex bad frogs with quirky jumps."
  ];

  let index = 0;
  strings = shuffleArray(strings);

  return function getSampleText(count) {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(strings[index]);
      index++;
      if (index >= strings.length) {
        index = 0;
        strings = shuffleArray(strings); // Reshuffle when all have been used
      }
    }
    return result.join(' ');
  };
}

const getSampleText = createSampler();

export default getSampleText;