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
    "Waltz, nymph, for quick jigs vex Bud.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "My girl wove six dozen plaid jackets before she quit.",
    "Amazingly few discotheques provide jukeboxes.",
    "Big fjords vex quick waltzing nymph.",
    "Cozy lummox gives smart squid who vex bad film.",
    "Jumpy halfling dwarves vex bad gnomes quite swiftly.",
    "Crazy Fredericka bought many very exquisite opal jewels.",
    "Glib jocks quiz nymph to vex dwarf.",
    "We promptly judged antique ivory buckles for the next prize.",
    "Grumpy wizards make a toxic brew for the jovial queen.",
    "Six big devils from Japan quickly forgot how to waltz.",
    "While waxing parquet decks, Sly Jim frequently gazed above."
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