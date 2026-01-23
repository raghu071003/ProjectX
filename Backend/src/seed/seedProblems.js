import Problem from "../models/Problem.js";

const problems = [
  // ================= ARRAYS =================
  
  {
    problemId: "two_sum",
    title: "Two Sum",
    description: "Return indices of the two numbers such that they add up to the target.",
    skillKey: "arrays",
    difficulty: "1",
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, target } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ nums: [2,7,11,15], target: 9 }),
        expectedOutput: "[0,1]"
      },
      {
        input: JSON.stringify({ nums: [3,2,4], target: 6 }),
        expectedOutput: "[1,2]",
        isHidden: true  
      }
    ]
  },

  {
    problemId: "best_time_buy_sell",
    title: "Best Time to Buy and Sell Stock",
    description: "Return the maximum profit you can achieve from buying and selling once.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 600,
    starterCode: {
      javascript: `function solve(input) {
  const prices = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[7,1,5,3,6,4]",
        expectedOutput: "5"
      },
      {
        input: "[7,6,4,3,1]",
        expectedOutput: "0",
        isHidden: true
      }
    ]
  },

  {
    problemId: "maximum_subarray",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 600,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6"
      },
      {
        input: "[1]",
        expectedOutput: "1",
        isHidden: true
      }
    ]
  },

  {
    problemId: "product_except_self",
    title: "Product of Array Except Self",
    description: "Return an array where each element is the product of all other elements.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[1,2,3,4]",
        expectedOutput: "[24,12,8,6]"
      },
      {
        input: "[-1,1,0,-3,3]",
        expectedOutput: "[0,0,9,0,0]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "find_min_rotated",
    title: "Find Minimum in Rotated Sorted Array",
    description: "Return the minimum element in a rotated sorted array.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[3,4,5,1,2]",
        expectedOutput: "1"
      },
      {
        input: "[4,5,6,7,0,1,2]",
        expectedOutput: "0",
        isHidden: true
      }
    ]
  },

  {
    problemId: "container_most_water",
    title: "Container With Most Water",
    description: "Find two lines that together with the x-axis form a container holding the most water.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(input) {
  const height = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[1,8,6,2,5,4,8,3,7]",
        expectedOutput: "49"
      },
      {
        input: "[1,1]",
        expectedOutput: "1",
        isHidden: true
      }
    ]
  },

  {
    problemId: "merge_intervals",
    title: "Merge Intervals",
    description: "Merge all overlapping intervals.",
    skillKey: "arrays",
    difficulty: "2",
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const intervals = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        expectedOutput: "[[1,6],[8,10],[15,18]]"
      },
      {
        input: "[[1,4],[4,5]]",
        expectedOutput: "[[1,5]]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "rotate_array",
    title: "Rotate Array",
    description: "Rotate the array to the right by k steps.",
    skillKey: "arrays",
    difficulty: "1",
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ nums: [1,2,3,4,5,6,7], k: 3 }),
        expectedOutput: "[5,6,7,1,2,3,4]"
      },
      {
        input: JSON.stringify({ nums: [-1,-100,3,99], k: 2 }),
        expectedOutput: "[3,99,-1,-100]",
        isHidden: true
      }
    ]
  }
,
{
    problemId: "contains_duplicate",
    title: "Contains Duplicate",
    description: "Return true if any value appears at least twice in the array.",
    skillKey: "hashing",
    difficulty: "1",
    estimatedTime: 400,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "valid_anagram",
    title: "Valid Anagram",
    description: "Return true if t is an anagram of s.",
    skillKey: "hashing",
    difficulty: "1",
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const { s, t } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ s: "anagram", t: "nagaram" }),
        expectedOutput: "true"
      },
      {
        input: JSON.stringify({ s: "rat", t: "car" }),
        expectedOutput: "false",
        isHidden: true
      }
    ]
  },

  {
    problemId: "group_anagrams",
    title: "Group Anagrams",
    description: "Group strings that are anagrams of each other.",
    skillKey: "hashing",
    difficulty: "2",
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(input) {
  const strs = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
      },
      {
        input: '[""]',
        expectedOutput: '[[""]]',
        isHidden: true
      }
    ]
  },

  {
    problemId: "top_k_frequent",
    title: "Top K Frequent Elements",
    description: "Return the k most frequent elements.",
    skillKey: "hashing",
    difficulty: "2",
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ nums: [1,1,1,2,2,3], k: 2 }),
        expectedOutput: "[1,2]"
      },
      {
        input: JSON.stringify({ nums: [1], k: 1 }),
        expectedOutput: "[1]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "two_sum_ii",
    title: "Two Sum II",
    description: "Return indices of two numbers such that they add up to target (1-indexed).",
    skillKey: "hashing",
    difficulty: "1",
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const { numbers, target } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ numbers: [2,7,11,15], target: 9 }),
        expectedOutput: "[1,2]"
      },
      {
        input: JSON.stringify({ numbers: [2,3,4], target: 6 }),
        expectedOutput: "[1,3]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "longest_consecutive",
    title: "Longest Consecutive Sequence",
    description: "Return the length of the longest consecutive elements sequence.",
    skillKey: "hashing",
    difficulty: "2",
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[100,4,200,1,3,2]",
        expectedOutput: "4"
      },
      {
        input: "[0,3,7,2,5,8,4,6,0,1]",
        expectedOutput: "9",
        isHidden: true
      }
    ]
  },

  {
    problemId: "subarray_sum_k",
    title: "Subarray Sum Equals K",
    description: "Return the total number of subarrays whose sum equals k.",
    skillKey: "hashing",
    difficulty: "3",
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ nums: [1,1,1], k: 2 }),
        expectedOutput: "2"
      },
      {
        input: JSON.stringify({ nums: [1,2,3], k: 3 }),
        expectedOutput: "2",
        isHidden: true
      }
    ]
  },

  {
    problemId: "isomorphic_strings",
    title: "Isomorphic Strings",
    description: "Check if two strings are isomorphic.",
    skillKey: "hashing",
    difficulty: "1",
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const { s, t } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ s: "egg", t: "add" }),
        expectedOutput: "true"
      },
      {
        input: JSON.stringify({ s: "foo", t: "bar" }),
        expectedOutput: "false",
        isHidden: true
      }
    ]
  },

  // ================= TWO POINTERS =================
  {
    problemId: "valid_palindrome",
    title: "Valid Palindrome",
    description: "Check if the given string is a palindrome considering only alphanumeric characters.",
    skillKey: "two_pointers",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const str = input.toLowerCase();
  // write logic
}`
    },
    testCases: [
      { input: "madam", expectedOutput: "true" },
      { input: "race a car", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "two_sum_sorted",
    title: "Two Sum (Sorted Input)",
    description: "Return indices (1-indexed) of two numbers such that they add up to target.",
    skillKey: "two_pointers",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const { numbers, target } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ numbers: [2,7,11,15], target: 9 }),
        expectedOutput: "[1,2]"
      },
      {
        input: JSON.stringify({ numbers: [2,3,4], target: 6 }),
        expectedOutput: "[1,3]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "remove_duplicates_sorted",
    title: "Remove Duplicates from Sorted Array",
    description: "Remove duplicates in-place and return the number of unique elements.",
    skillKey: "two_pointers",
    difficulty: 2,
    estimatedTime: 400,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: "[1,1,2]", expectedOutput: "2" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5", isHidden: true }
    ]
  },

  {
    problemId: "remove_element",
    title: "Remove Element",
    description: "Remove all occurrences of val in-place and return the new length.",
    skillKey: "two_pointers",
    difficulty: 2,
    estimatedTime: 400,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, val } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: JSON.stringify({ nums: [3,2,2,3], val: 3 }),
        expectedOutput: "2"
      },
      {
        input: JSON.stringify({ nums: [0,1,2,2,3,0,4,2], val: 2 }),
        expectedOutput: "5",
        isHidden: true
      }
    ]
  },

  {
    problemId: "squares_sorted_array",
    title: "Squares of a Sorted Array",
    description: "Return an array of the squares of each number sorted in non-decreasing order.",
    skillKey: "two_pointers",
    difficulty: 2,
    estimatedTime: 400,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[-4,-1,0,3,10]",
        expectedOutput: "[0,1,9,16,100]"
      },
      {
        input: "[-7,-3,2,3,11]",
        expectedOutput: "[4,9,9,49,121]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "three_sum",
    title: "3Sum",
    description: "Return all unique triplets that sum to zero.",
    skillKey: "two_pointers",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[-1,0,1,2,-1,-4]",
        expectedOutput: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        input: "[0,0,0,0]",
        expectedOutput: "[[0,0,0]]",
        isHidden: true
      }
    ]
  },

  {
    problemId: "trapping_rain_water",
    title: "Trapping Rain Water",
    description: "Return how much rainwater can be trapped.",
    skillKey: "two_pointers",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(input) {
  const height = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      {
        input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
        expectedOutput: "6"
      },
      {
        input: "[4,2,0,3,2,5]",
        expectedOutput: "9",
        isHidden: true
      }
    ]
  },

  {
    problemId: "reverse_string",
    title: "Reverse String",
    description: "Reverse the given string.",
    skillKey: "two_pointers",
    difficulty: 1,
    estimatedTime: 200,
    starterCode: {
      javascript: `function solve(input) {
  const str = input;
  // write logic
}`
    },
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "abcd", expectedOutput: "dcba", isHidden: true }
    ]
  },

  // ================= SLIDING WINDOW =================
  {
    problemId: "longest_substring",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    skillKey: "sliding_window",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const s = input;
  // write logic
}`
    },
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1", isHidden: true }
    ]
  },

  {
    problemId: "max_subarray_k",
    title: "Maximum Sum Subarray of Size K",
    description: "Find the maximum sum of any contiguous subarray of size k.",
    skillKey: "sliding_window",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ nums: [2,1,5,1,3,2], k: 3 }), expectedOutput: "9" },
      { input: JSON.stringify({ nums: [2,3,4,1,5], k: 2 }), expectedOutput: "7", isHidden: true }
    ]
  },

  {
    problemId: "min_window_substring",
    title: "Minimum Window Substring",
    description: "Return the smallest substring of s that contains all characters of t.",
    skillKey: "sliding_window",
    difficulty: 5,
    estimatedTime: 1500,
    starterCode: {
      javascript: `function solve(input) {
  const { s, t } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ s: "ADOBECODEBANC", t: "ABC" }), expectedOutput: "BANC" },
      { input: JSON.stringify({ s: "a", t: "a" }), expectedOutput: "a", isHidden: true }
    ]
  },

  {
    problemId: "permutation_in_string",
    title: "Permutation in String",
    description: "Check if s2 contains a permutation of s1.",
    skillKey: "sliding_window",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(input) {
  const { s1, s2 } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ s1: "ab", s2: "eidbaooo" }), expectedOutput: "true" },
      { input: JSON.stringify({ s1: "ab", s2: "eidboaoo" }), expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "find_all_anagrams",
    title: "Find All Anagrams in a String",
    description: "Return all starting indices of s2's substrings which are anagrams of s1.",
    skillKey: "sliding_window",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(input) {
  const { s, p } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ s: "cbaebabacd", p: "abc" }), expectedOutput: "[0,6]" },
      { input: JSON.stringify({ s: "abab", p: "ab" }), expectedOutput: "[0,1,2]", isHidden: true }
    ]
  },

  {
    problemId: "longest_repeating_char",
    title: "Longest Repeating Character Replacement",
    description: "Return the length of the longest substring containing the same letter you can get after k replacements.",
    skillKey: "sliding_window",
    difficulty: 4,
    estimatedTime: 1000,
    starterCode: {
      javascript: `function solve(input) {
  const { s, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ s: "ABAB", k: 2 }), expectedOutput: "4" },
      { input: JSON.stringify({ s: "AABABBA", k: 1 }), expectedOutput: "4", isHidden: true }
    ]
  },

  {
    problemId: "fruits_into_baskets",
    title: "Fruit Into Baskets",
    description: "Return the length of the longest subarray containing at most 2 distinct types of fruits.",
    skillKey: "sliding_window",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(input) {
  const fruits = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: "[1,2,1]", expectedOutput: "3" },
      { input: "[0,1,2,2]", expectedOutput: "3", isHidden: true }
    ]
  },

  {
    problemId: "subarrays_k_distinct",
    title: "Subarrays with K Different Integers",
    description: "Return the number of subarrays containing exactly k distinct integers.",
    skillKey: "sliding_window",
    difficulty: 5,
    estimatedTime: 1500,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ nums: [1,2,1,2,3], k: 2 }), expectedOutput: "7" },
      { input: JSON.stringify({ nums: [1,2,1,3,4], k: 3 }), expectedOutput: "3", isHidden: true }
    ]
  },
  // ================= STRINGS =================
  {
    problemId: "valid_palindrome_string",
    title: "Valid Palindrome",
    description: "Check if the string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    skillKey: "strings",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const s = input.toLowerCase();
  // write logic
}`
    },
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true" },
      { input: "race a car", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "reverse_words",
    title: "Reverse Words in a String",
    description: "Reverse the order of words in a given string.",
    skillKey: "strings",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const s = input;
  // write logic
}`
    },
    testCases: [
      { input: "the sky is blue", expectedOutput: "blue is sky the" },
      { input: "  hello world  ", expectedOutput: "world hello", isHidden: true }
    ]
  },

  {
    problemId: "string_compression",
    title: "String Compression",
    description: "Compress the string such that consecutive repeating characters are replaced by the character followed by the count.",
    skillKey: "strings",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const chars = input;
  // write logic
}`
    },
    testCases: [
      { input: "aabcccccaaa", expectedOutput: "a2b1c5a3" },
      { input: "abc", expectedOutput: "abc", isHidden: true }
    ]
  },

  // ================= SORTING =================
   {
    problemId: "sort_colors",
    title: "Sort Colors",
    description: "Sort an array containing 0s, 1s, and 2s in-place (Dutch National Flag problem).",
    skillKey: "sorting",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(input) {
  const nums = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: "[2,0,2,1,1,0]", expectedOutput: "[0,0,1,1,2,2]" },
      { input: "[2,0,1]", expectedOutput: "[0,1,2]", isHidden: true }
    ]
  },

  {
    problemId: "kth_largest",
    title: "Kth Largest Element in an Array",
    description: "Return the kth largest element in an unsorted array.",
    skillKey: "sorting",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, k } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ nums: [3,2,1,5,6,4], k: 2 }), expectedOutput: "5" },
      { input: JSON.stringify({ nums: [3,2,3,1,2,4,5,5,6], k: 4 }), expectedOutput: "4", isHidden: true }
    ]
  },

  // ================= BINARY SEARCH =================
   {
    problemId: "binary_search",
    title: "Binary Search",
    description: "Given a sorted array, return the index of target if found, otherwise -1.",
    skillKey: "binary_search",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, target } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ nums: [1,2,3,4,5,6], target: 4 }), expectedOutput: "3" },
      { input: JSON.stringify({ nums: [1,2,3,4,5], target: 6 }), expectedOutput: "-1", isHidden: true }
    ]
  },

  {
    problemId: "search_rotated",
    title: "Search in Rotated Sorted Array",
    description: "Search for target in a rotated sorted array and return its index, or -1 if not found.",
    skillKey: "binary_search",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(input) {
  const { nums, target } = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: JSON.stringify({ nums: [4,5,6,7,0,1,2], target: 0 }), expectedOutput: "4" },
      { input: JSON.stringify({ nums: [4,5,6,7,0,1,2], target: 3 }), expectedOutput: "-1", isHidden: true }
    ]
  },

  // ================= STACK =================
  {
    problemId: "valid_parentheses",
    title: "Valid Parentheses",
    description: "Given a string containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    skillKey: "stack",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(input) {
  const s = input;
  // write logic
}`
    },
    testCases: [
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "min_stack",
    title: "Min Stack",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    skillKey: "stack",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `class MinStack {
  constructor() {
    // initialize stack
  }

  push(x) {
    // implement push
  }

  pop() {
    // implement pop
  }

  top() {
    // implement top
  }

  getMin() {
    // implement getMin
  }
}

function solve(input) {
  // optional wrapper
}`
    },
    testCases: [
      { input: "push(1),push(2),push(-1),getMin()", expectedOutput: "-1" },
      { input: "push(3),pop(),getMin()", expectedOutput: "3", isHidden: true }
    ]
  },

  {
    problemId: "daily_temperatures",
    title: "Daily Temperatures",
    description: "Return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    skillKey: "stack",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(input) {
  const temperatures = JSON.parse(input);
  // write logic
}`
    },
    testCases: [
      { input: "[73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]" },
      { input: "[30,40,50,60]", expectedOutput: "[1,1,1,0]", isHidden: true }
    ]
  },

  // ================= QUEUE =================
   {
    problemId: "implement_queue",
    title: "Implement Queue using Stacks",
    description: "Implement a queue using two stacks supporting push, pop, peek, and empty operations.",
    skillKey: "queue",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `class MyQueue {
  constructor() {
    // initialize stacks
  }

  push(x) {
    // implement push
  }

  pop() {
    // implement pop
  }

  peek() {
    // implement peek
  }

  empty() {
    // implement empty
  }
}

function solve(input) {
  // optional wrapper
}`
    },
    testCases: [
      { input: "push(1),push(2),peek(),pop(),empty()", expectedOutput: "1" },
      { input: "push(3),push(4),pop(),peek()", expectedOutput: "4", isHidden: true }
    ]
  },

  {
    problemId: "moving_average",
    title: "Moving Average from Data Stream",
    description: "Calculate the moving average of a stream of integers with a fixed window size.",
    skillKey: "queue",
    difficulty: 2,
    estimatedTime: 400,
    starterCode: {
      javascript: `class MovingAverage {
  constructor(size) {
    // initialize queue and size
  }

  next(val) {
    // add val and return moving average
  }
}

function solve(input) {
  // optional wrapper
}`
    },
    testCases: [
      { input: "MovingAverage(3),next(1),next(10),next(3),next(5)", expectedOutput: "[1,5.5,4.6666666667,6]" },
      { input: "MovingAverage(2),next(5),next(6)", expectedOutput: "[5,5.5]", isHidden: true }
    ]
  },

  // ================= LINKED LIST =================
  {
    problemId: "reverse_linked_list",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list and return the head of the reversed list.",
    skillKey: "linked_list",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(head) {
  // head is the head of a linked list
  // return the new head after reversing
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]", isHidden: true }
    ]
  },

  {
    problemId: "merge_two_lists",
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a new sorted list.",
    skillKey: "linked_list",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(list1, list2) {
  // list1 and list2 are heads of sorted linked lists
  // return the head of merged sorted list
}`
    },
    testCases: [
      { input: "[1,2,4],[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[],[0]", expectedOutput: "[0]", isHidden: true }
    ]
  },

  {
    problemId: "detect_cycle",
    title: "Linked List Cycle",
    description: "Given a linked list, determine if it has a cycle in it.",
    skillKey: "linked_list",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(head) {
  // head is the head of a linked list
  // return true if there is a cycle, false otherwise
}`
    },
    testCases: [
      { input: "[3,2,0,-4],pos=1", expectedOutput: "true" },
      { input: "[1,2],pos=0", expectedOutput: "true", isHidden: true }
    ]
  },

  // ================= RECURSION =================
  {
    problemId: "fibonacci",
    title: "Fibonacci Number",
    description: "Return the nth Fibonacci number using recursion.",
    skillKey: "recursion",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(n) {
  // return the nth Fibonacci number
}`
    },
    testCases: [
      { input: "5", expectedOutput: "5" },
      { input: "10", expectedOutput: "55", isHidden: true }
    ]
  },

  {
    problemId: "generate_parentheses",
    title: "Generate Parentheses",
    description: "Generate all combinations of well-formed parentheses for n pairs.",
    skillKey: "recursion",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(n) {
  // return an array of strings with all valid parentheses combinations
}`
    },
    testCases: [
      { input: "3", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: "2", expectedOutput: '["(())","()()"]', isHidden: true }
    ]
  },

  // ================= BACKTRACKING =================
  {
    problemId: "subsets",
    title: "Subsets",
    description: "Given a set of distinct integers, return all possible subsets (the power set).",
    skillKey: "backtracking",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(nums) {
  // return an array of arrays containing all subsets
}`
    },
    testCases: [
      { input: "[1,2,3]", expectedOutput: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" },
      { input: "[0,1]", expectedOutput: "[[],[0],[1],[0,1]]", isHidden: true }
    ]
  },

  {
    problemId: "combination_sum",
    title: "Combination Sum",
    description: "Given an array of distinct integers and a target, return all unique combinations where the numbers sum to target. Numbers can be used unlimited times.",
    skillKey: "backtracking",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(candidates, target) {
  // return an array of arrays containing all valid combinations
}`
    },
    testCases: [
      { input: "[2,3,6,7],7", expectedOutput: "[[7],[2,2,3]]" },
      { input: "[2,3,5],8", expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]", isHidden: true }
    ]
  },

  // ================= GREEDY =================
  {
    problemId: "jump_game",
    title: "Jump Game",
    description: "Given an array of non-negative integers, where each element represents your maximum jump length, determine if you can reach the last index.",
    skillKey: "greedy",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(nums) {
  // return true if you can reach the last index, false otherwise
}`
    },
    testCases: [
      { input: "[2,3,1,1,4]", expectedOutput: "true" },
      { input: "[3,2,1,0,4]", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "gas_station",
    title: "Gas Station",
    description: "Given two arrays gas and cost, return the starting gas station index to travel around the circuit once, or -1 if impossible.",
    skillKey: "greedy",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(gas, cost) {
  // return the starting index or -1
}`
    },
    testCases: [
      { input: "[1,2,3,4,5],[3,4,5,1,2]", expectedOutput: "3" },
      { input: "[2,3,4],[3,4,3]", expectedOutput: "-1", isHidden: true }
    ]
  },

  // ================= HEAP =================
  {
    problemId: "k_closest_points",
    title: "K Closest Points to Origin",
    description: "Given an array of points in a 2D plane, return the k points closest to the origin (0,0).",
    skillKey: "heap",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(points, k) {
  // return an array of k closest points
}`
    },
    testCases: [
      { input: "[[1,3],[-2,2]],1", expectedOutput: "[[-2,2]]" },
      { input: "[[3,3],[5,-1],[-2,4]],2", expectedOutput: "[[3,3],[-2,4]]", isHidden: true }
    ]
  },

  {
    problemId: "task_scheduler",
    title: "Task Scheduler",
    description: "Given a list of tasks and a cooldown interval, return the least number of units of times that the CPU will take to finish all tasks.",
    skillKey: "heap",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(tasks, n) {
  // return the minimum total time
}`
    },
    testCases: [
      { input: '["A","A","A","B","B","B"],2', expectedOutput: "8" },
      { input: '["A","A","A","B","B","B"],0', expectedOutput: "6", isHidden: true }
    ]
  },

  // ================= TREES =================
  {
    problemId: "max_depth_tree",
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.",
    skillKey: "tree",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return the maximum depth
}`
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3" },
      { input: "[1,null,2]", expectedOutput: "2", isHidden: true }
    ]
  },

  {
    problemId: "invert_tree",
    title: "Invert Binary Tree",
    description: "Invert a binary tree and return its root.",
    skillKey: "tree",
    difficulty: 2,
    estimatedTime: 400,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return the root after inverting
}`
    },
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]", isHidden: true }
    ]
  },

  // ================= BINARY TREE =================
    {
    problemId: "level_order",
    title: "Binary Tree Level Order Traversal",
    description: "Return the level order traversal of a binary tree's nodes as a list of lists.",
    skillKey: "binary_tree",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return a 2D array of values by level
}`
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" },
      { input: "[1]", expectedOutput: "[[1]]", isHidden: true }
    ]
  },

  {
    problemId: "diameter_tree",
    title: "Diameter of Binary Tree",
    description: "Return the length of the diameter of the binary tree. The diameter is the length of the longest path between any two nodes.",
    skillKey: "binary_tree",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return the diameter length
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "3" },
      { input: "[1,2]", expectedOutput: "1", isHidden: true }
    ]
  },

  // ================= BST =================
  {
    problemId: "validate_bst",
    title: "Validate Binary Search Tree",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    skillKey: "bst",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return true if it's a valid BST, false otherwise
}`
    },
    testCases: [
      { input: "[2,1,3]", expectedOutput: "true" },
      { input: "[5,1,4,null,null,3,6]", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "kth_smallest",
    title: "Kth Smallest Element in a BST",
    description: "Given the root of a BST and an integer k, return the kth smallest element in the tree.",
    skillKey: "bst",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(root, k) {
  // root is the root of a BST
  // return the kth smallest element
}`
    },
    testCases: [
      { input: "[3,1,4,null,2],1", expectedOutput: "1" },
      { input: "[5,3,6,2,4,null,null,1],3", expectedOutput: "3", isHidden: true }
    ]
  },

  // ================= GRAPH =================
  {
    problemId: "number_of_islands",
    title: "Number of Islands",
    description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    skillKey: "graph",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `function solve(grid) {
  // grid is a 2D array of '1's and '0's
  // return the number of islands
}`
    },
    testCases: [
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: "3" },
      { input: '[["1","0","1"],["0","1","0"],["1","0","1"]]', expectedOutput: "5", isHidden: true }
    ]
  },

  {
    problemId: "clone_graph",
    title: "Clone Graph",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    skillKey: "graph",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(node) {
  // node is a reference to a graph node
  // return a deep copy of the graph
}`
    },
    testCases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: '[[1,2,4],[2,3],[1,4],[2,3]]', expectedOutput: '[[1,2,4],[2,3],[1,4],[2,3]]', isHidden: true }
    ]
  },

  // ================= BFS =================
  {
    problemId: "binary_tree_right_view",
    title: "Binary Tree Right Side View",
    description: "Given the root of a binary tree, return the values of the nodes visible from the right side, top to bottom.",
    skillKey: "bfs",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(root) {
  // root is the root of a binary tree
  // return an array of node values visible from the right side
}`
    },
    testCases: [
      { input: "[1,2,3,null,5,null,4]", expectedOutput: "[1,3,4]" },
      { input: "[1,2,3,4]", expectedOutput: "[1,3,4]", isHidden: true }
    ]
  },

  {
    problemId: "rotting_oranges",
    title: "Rotting Oranges",
    description: "Given a grid of oranges, return the minimum time required to rot all fresh oranges. If impossible, return -1.",
    skillKey: "bfs",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(grid) {
  // grid is a 2D array with 0 (empty), 1 (fresh), 2 (rotten)
  // return the minimum minutes to rot all oranges or -1
}`
    },
    testCases: [
      { input: "[[2,1,1],[1,1,0],[0,1,1]]", expectedOutput: "4" },
      { input: "[[2,1,1],[0,1,1],[1,0,1]]", expectedOutput: "-1", isHidden: true }
    ]
  },

  // ================= DFS =================
  {
    problemId: "path_sum",
    title: "Path Sum",
    description: "Given the root of a binary tree and a target sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the target sum.",
    skillKey: "dfs",
    difficulty: 2,
    estimatedTime: 600,
    starterCode: {
      javascript: `function solve(root, targetSum) {
  // root is the root of a binary tree
  // return true if a path exists, false otherwise
}`
    },
    testCases: [
      { input: "[5,4,8,11,null,13,4,7,2,null,null,null,1],22", expectedOutput: "true" },
      { input: "[1,2,3],5", expectedOutput: "false", isHidden: true }
    ]
  },

  {
    problemId: "course_schedule",
    title: "Course Schedule",
    description: "There are numCourses courses labeled from 0 to numCourses-1. Given prerequisites as pairs, determine if it is possible to finish all courses.",
    skillKey: "dfs",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(numCourses, prerequisites) {
  // numCourses is an integer
  // prerequisites is an array of [course, prerequisite] pairs
  // return true if all courses can be finished, false otherwise
}`
    },
    testCases: [
      { input: "2,[[1,0]]", expectedOutput: "true" },
      { input: "2,[[1,0],[0,1]]", expectedOutput: "false", isHidden: true }
    ]
  },

  // ================= DYNAMIC PROGRAMMING =================
  {
    problemId: "climbing_stairs",
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.",
    skillKey: "dynamic_programming",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(n) {
  // return the number of distinct ways to climb n stairs
}`
    },
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3", isHidden: true }
    ]
  },

  {
    problemId: "house_robber",
    title: "House Robber",
    description: "Given a list of non-negative integers representing the amount of money in each house, return the maximum amount you can rob without robbing adjacent houses.",
    skillKey: "dynamic_programming",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(nums) {
  // nums is an array of non-negative integers
  // return the maximum amount that can be robbed
}`
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "4" },
      { input: "[2,7,9,3,1]", expectedOutput: "12", isHidden: true }
    ]
  },

  {
    problemId: "longest_increasing_subsequence",
    title: "Longest Increasing Subsequence",
    description: "Given an integer array, return the length of the longest strictly increasing subsequence.",
    skillKey: "dynamic_programming",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(nums) {
  // nums is an array of integers
  // return the length of the longest increasing subsequence
}`
    },
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4" },
      { input: "[0,1,0,3,2,3]", expectedOutput: "4", isHidden: true }
    ]
  },

  // ================= BIT MANIPULATION =================
  {
    problemId: "single_number",
    title: "Single Number",
    description: "Given a non-empty array of integers, every element appears twice except for one. Find that single one.",
    skillKey: "bit_manipulation",
    difficulty: 1,
    estimatedTime: 300,
    starterCode: {
      javascript: `function solve(nums) {
  // nums is an array of integers
  // return the element that appears only once
}`
    },
    testCases: [
      { input: "[2,2,1]", expectedOutput: "1" },
      { input: "[4,1,2,1,2]", expectedOutput: "4", isHidden: true }
    ]
  },

  {
    problemId: "counting_bits",
    title: "Counting Bits",
    description: "Given a non-negative integer num, return an array of the number of 1's in the binary representation of every number from 0 to num.",
    skillKey: "bit_manipulation",
    difficulty: 2,
    estimatedTime: 500,
    starterCode: {
      javascript: `function solve(num) {
  // return an array of counts of 1's for numbers 0..num
}`
    },
    testCases: [
      { input: "2", expectedOutput: "[0,1,1]" },
      { input: "5", expectedOutput: "[0,1,1,2,1,2]", isHidden: true }
    ]
  },

  // ================= TRIE =================
  {
    problemId: "implement_trie",
    title: "Implement Trie",
    description: "Implement a Trie with insert, search, and startsWith methods.",
    skillKey: "trie",
    difficulty: 3,
    estimatedTime: 900,
    starterCode: {
      javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    // implement insert
  }

  search(word) {
    // implement search
  }

  startsWith(prefix) {
    // implement startsWith
  }
}

function solve(operations, words) {
  // operations is an array like ["Trie","insert","search"]
  // words is an array like [[],["apple"],["apple"]]
  // return results of operations
}`
    },
    testCases: [
      { input: '["Trie","insert","search","search","startsWith"],[[],["apple"],["apple"],["app"],["app"]]', expectedOutput: '[null,null,true,false,true]' },
      { input: '["Trie","insert","search"],[[],["banana"],["banana"]]', expectedOutput: '[null,null,true]', isHidden: true }
    ]
  },

  {
    problemId: "word_search_ii",
    title: "Word Search II",
    description: "Given a 2D board and a list of words, find all words in the board. Each word must be constructed from letters of sequentially adjacent cells.",
    skillKey: "trie",
    difficulty: 5,
    estimatedTime: 1500,
    starterCode: {
      javascript: `function solve(board, words) {
  // board is a 2D array of characters
  // words is an array of strings
  // return an array of words found in the board
}`
    },
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],["oath","pea","eat","rain"]', expectedOutput: '["eat","oath"]' },
      { input: '[["a","b"],["c","d"]],["ab","abcd","ad"]', expectedOutput: '["ab","ad"]', isHidden: true }
    ]
  },

  // ================= UNION FIND =================
  {
    problemId: "connected_components",
    title: "Number of Connected Components",
    description: "Given n nodes and a list of edges of an undirected graph, return the number of connected components in the graph.",
    skillKey: "union_find",
    difficulty: 3,
    estimatedTime: 800,
    starterCode: {
      javascript: `function solve(n, edges) {
  // n is the number of nodes (0 to n-1)
  // edges is an array of [u, v]
  // return the number of connected components
}`
    },
    testCases: [
      { input: "5,[[0,1],[1,2],[3,4]]", expectedOutput: "2" },
      { input: "5,[[0,1],[1,2],[2,3],[3,4]]", expectedOutput: "1", isHidden: true }
    ]
  },

  {
    problemId: "redundant_connection",
    title: "Redundant Connection",
    description: "In a graph that started as a tree with n nodes, one extra edge is added. Return the edge that can be removed to make the graph a tree again.",
    skillKey: "union_find",
    difficulty: 3,
    estimatedTime: 700,
    starterCode: {
      javascript: `function solve(edges) {
  // edges is an array of [u, v]
  // return the redundant edge
}`
    },
    testCases: [
      { input: "[[1,2],[1,3],[2,3]]", expectedOutput: "[2,3]" },
      { input: "[[1,2],[2,3],[3,4],[1,4],[1,5]]", expectedOutput: "[1,4]", isHidden: true }
    ]
  },

  // ================= TOPOLOGICAL SORT =================
  {
    problemId: "course_schedule_ii",
    title: "Course Schedule II",
    description: "There are numCourses courses labeled from 0 to numCourses-1. Given prerequisites as pairs, return a possible order to finish all courses. If impossible, return an empty array.",
    skillKey: "topological_sort",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(numCourses, prerequisites) {
  // numCourses is an integer
  // prerequisites is an array of [course, prerequisite] pairs
  // return an array representing a valid course order, or [] if impossible
}`
    },
    testCases: [
      { input: "2,[[1,0]]", expectedOutput: "[0,1]" },
      { input: "4,[[1,0],[2,0],[3,1],[3,2]]", expectedOutput: "[0,1,2,3]", isHidden: true }
    ]
  },

  {
    problemId: "alien_dictionary",
    title: "Alien Dictionary",
    description: "Given a list of words from an alien language sorted lexicographically, return a string of the characters in order according to the alien language. If multiple orders exist, return any. If impossible, return an empty string.",
    skillKey: "topological_sort",
    difficulty: 5,
    estimatedTime: 1500,
    starterCode: {
      javascript: `function solve(words) {
  // words is an array of strings
  // return a string representing the character order, or "" if impossible
}`
    },
    testCases: [
      { input: '["wrt","wrf","er","ett","rftt"]', expectedOutput: '"wertf"' },
      { input: '["z","x","z"]', expectedOutput: '""', isHidden: true }
    ]
  },

  // ================= SHORTEST PATH =================
  {
    problemId: "network_delay",
    title: "Network Delay Time",
    description: "There are N network nodes, labeled 1 to N. Times is a list of travel times as directed edges [u, v, w]. Return the time it takes for all nodes to receive a signal sent from a given source K. If impossible, return -1.",
    skillKey: "shortest_path",
    difficulty: 4,
    estimatedTime: 1200,
    starterCode: {
      javascript: `function solve(times, N, K) {
  // times is an array of [u, v, w]
  // N is number of nodes, K is starting node
  // return total delay time or -1
}`
    },
    testCases: [
      { input: "[[2,1,1],[2,3,1],[3,4,1]],4,2", expectedOutput: "2" },
      { input: "[[1,2,1]],2,2", expectedOutput: "-1", isHidden: true }
    ]
  },

  {
    problemId: "cheapest_flights",
    title: "Cheapest Flights Within K Stops",
    description: "Given n cities connected by flights [from, to, price], find the cheapest price from source to destination with at most K stops. Return -1 if no such route exists.",
    skillKey: "shortest_path",
    difficulty: 5,
    estimatedTime: 1500,
    starterCode: {
      javascript: `function solve(n, flights, src, dst, K) {
  // n is number of cities
  // flights is an array of [from, to, price]
  // src and dst are source/destination
  // K is max stops
  // return the minimum price or -1
}`
    },
    testCases: [
      { input: "3,[[0,1,100],[1,2,100],[0,2,500]],0,2,1", expectedOutput: "200" },
      { input: "3,[[0,1,100],[1,2,100],[0,2,500]],0,2,0", expectedOutput: "500", isHidden: true }
    ]
  },
];

const seedProblems = async () => {
  for (const p of problems) {
    await Problem.updateOne(
      { problemId: p.problemId },
      { $setOnInsert: p },
      { upsert: true },
    );
  }
  console.log("Problems seeded");
};

export default seedProblems;
