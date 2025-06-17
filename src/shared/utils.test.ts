import { describe, expect, it } from 'vitest';
import {
  calculateReadingTime,
  formatDate,
  formatDateTime,
  kmpSearch,
  pluralize,
} from './utils';

describe('calculateReadingTime', () => {
  it('should calculate reading time for normal content', () => {
    const content = 'This is a test content with exactly twenty words in it to test the reading time calculation function properly.';
    expect(calculateReadingTime(content)).toBe(1);
  });

  it('should round up to nearest minute', () => {
    const content = Array.from({ length: 201 }).fill('word').join(' '); // 201 words
    expect(calculateReadingTime(content)).toBe(2);
  });

  it('should handle empty string', () => {
    expect(calculateReadingTime('')).toBe(0);
  });

  it('should handle single word', () => {
    expect(calculateReadingTime('word')).toBe(1);
  });

  it('should handle multiple spaces', () => {
    expect(calculateReadingTime('word1    word2     word3')).toBe(1);
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2023-04-09T12:00:00Z');
    expect(result).toMatch(/^\d{1,2} [А-Я][а-я]{2}$/);
  });

  it('should handle different date formats', () => {
    const result = formatDate('2023-12-25');
    expect(result).toMatch(/^\d{1,2} [А-Я][а-я]{2}$/);
  });

  it('should capitalize first letter of month', () => {
    const result = formatDate('2023-01-01T00:00:00Z');
    expect(result.charAt(result.indexOf(' ') + 1)).toMatch(/[А-Я]/);
  });
});

describe('formatDateTime', () => {
  it('should format datetime correctly', () => {
    const result = formatDateTime('2023-04-09T15:30:00Z');
    expect(result).toMatch(/^\d{1,2}\.\d{1,2}\.\d{4} в \d{2}:\d{2}$/);
  });

  it('should handle different timezones', () => {
    const result = formatDateTime('2023-12-25T23:59:59Z');
    expect(result).toContain(' в ');
    expect(result).toMatch(/:\d{2}$/);
  });
});

describe('pluralize', () => {
  const forms = ['яблоко', 'яблока', 'яблок'];

  it('should return singular form for 1', () => {
    expect(pluralize(1, forms)).toBe('яблоко');
  });

  it('should return plural form for 2-4', () => {
    expect(pluralize(2, forms)).toBe('яблока');
    expect(pluralize(3, forms)).toBe('яблока');
    expect(pluralize(4, forms)).toBe('яблока');
  });

  it('should return genitive form for 0', () => {
    expect(pluralize(0, forms)).toBe('яблок');
  });

  it('should return genitive form for 5 and above', () => {
    expect(pluralize(5, forms)).toBe('яблок');
    expect(pluralize(10, forms)).toBe('яблок');
    expect(pluralize(100, forms)).toBe('яблок');
  });

  it('should handle large numbers', () => {
    expect(pluralize(1000, forms)).toBe('яблок');
  });
});

describe('kmpSearch', () => {
  it('should find exact match', () => {
    expect(kmpSearch('hello world', 'world')).toBe(true);
    expect(kmpSearch('hello world', 'hello')).toBe(true);
  });

  it('should be case insensitive', () => {
    expect(kmpSearch('Hello World', 'WORLD')).toBe(true);
    expect(kmpSearch('HELLO WORLD', 'hello')).toBe(true);
  });

  it('should return false for non-matching patterns', () => {
    expect(kmpSearch('hello world', 'foo')).toBe(false);
    expect(kmpSearch('hello world', 'worlds')).toBe(false);
  });

  it('should handle empty pattern', () => {
    expect(kmpSearch('hello world', '')).toBe(true);
  });

  it('should handle empty text', () => {
    expect(kmpSearch('', 'pattern')).toBe(false);
  });

  it('should handle both empty', () => {
    expect(kmpSearch('', '')).toBe(true);
  });

  it('should find pattern at the beginning', () => {
    expect(kmpSearch('pattern text', 'pattern')).toBe(true);
  });

  it('should find pattern at the end', () => {
    expect(kmpSearch('some text pattern', 'pattern')).toBe(true);
  });

  it('should handle overlapping patterns', () => {
    expect(kmpSearch('ababab', 'abab')).toBe(true);
  });

  it('should handle complex patterns', () => {
    expect(kmpSearch('ABABACABABAB', 'ABABAC')).toBe(true);
    expect(kmpSearch('ABABACABABAB', 'ABABAD')).toBe(false);
  });

  it('should handle single character patterns', () => {
    expect(kmpSearch('hello', 'e')).toBe(true);
    expect(kmpSearch('hello', 'x')).toBe(false);
  });
});
