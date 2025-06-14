/**
 * @name calculateReadingTime
 * @description Calculates the reading time for a given content based on an average reading speed of 200 words per minute.
 *
 * @param {string} content - The content for which to calculate the reading time.
 * @returns {number} The estimated reading time in minutes, rounded up to the nearest whole number.
 *
 * @example
 * const time = calculateReadingTime("This is a sample content to test the reading time calculation.");
 * console.log(time); // Outputs: 1
 */
export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;

  return Math.ceil(words / wordsPerMinute);
}

/**
 * @name formatDate
 * @description Formats a date string into a more readable format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string in the format "dd MMMM".
 *
 * @example
 * const formattedDate = formatDate("2023-10-01T12:00:00Z");
 * console.log(formattedDate); // Outputs: "9 Apr"
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const month = date.toLocaleDateString('ru-RU', {
    month: 'short',
  });

  return `${date.getDate()} ${month.charAt(0).toUpperCase() + month.slice(1, -1)}`;
}

/**
 * @name formatDateTime
 * @description Formats a date string into a more readable format with time.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string in the format "dd.MMMM.yyyy в HH:mm".
 *
 * @example
 * const formattedDateTime = formatDateTime("2023-10-01T12:00:00Z");
 * console.log(formattedDateTime); // Outputs: "1.04.2025 в 12:00"
 */
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const onlyDate = date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${onlyDate} в ${time}`;
}

/**
 * @name pluralize
 * @description Returns a pluralized form of a word based on the count.
 *
 * @param {number} count - The count to determine the pluralization.
 * @param {string[]} forms - An array containing the singular, plural, and genitive forms of the word.
 * @returns {string} The appropriate form of the word based on the count.
 *
 * @example
 * const word = pluralize(1, ['яблоко', 'яблока', 'яблок']);
 * console.log(word); // Outputs: "яблоко"
 */
export function pluralize(count: number, forms: string[]) {
  const [singular, plural, genitive] = forms;

  if (count === 1)
    return singular;
  if (count > 1 && count < 5)
    return plural;

  return genitive;
}

/**
 * @name computeLPS
 * @description Computes the Longest Prefix Suffix (LPS) array for the KMP algorithm.
 *
 * @param {string} pattern - The pattern for which to compute the LPS array.
 * @returns {number[]} The LPS array where lps[i] is the length of the longest proper prefix which is also a suffix for the substring pattern[0..i].
 *
 * @example
 * const lps = computeLPS("ABABAC");
 * console.log(lps); // Outputs: [0, 0, 1, 2, 0, 1]
 */
function computeLPS(pattern: string) {
  const lps = Array.from<number>({ length: pattern.length }).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    }
    else {
      if (len !== 0) {
        len = lps[len - 1]!;
      }
      else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * @name kmpSearch
 * @description Implements the Knuth-Morris-Pratt (KMP) algorithm for substring search.
 *
 * @param {string} text - The text in which to search for the pattern.
 * @param {string} pattern - The pattern to search for in the text.
 * @returns {boolean} Returns true if the pattern is found in the text, otherwise false.
 *
 * @example
 * const found = kmpSearch("hello world", "world");
 * console.log(found); // Outputs: true
 */
export function kmpSearch(text: string, pattern: string) {
  if (pattern.length === 0)
    return true;
  if (text.length === 0)
    return false;

  const textLower = text.toLowerCase();
  const patternLower = pattern.toLowerCase();
  const lps = computeLPS(patternLower);

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < textLower.length) {
    if (patternLower[j] === textLower[i]) {
      i++;
      j++;
    }

    if (j === patternLower.length) {
      return true; // Found match
    }
    else if (i < textLower.length && patternLower[j] !== textLower[i]) {
      if (j !== 0) {
        j = lps[j - 1]!;
      }
      else {
        i++;
      }
    }
  }

  return false;
}
