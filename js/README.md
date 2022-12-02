# Word Search

Install Node https://nodejs.org/en/download/

Install dependencies with:

```
npm i
```

Update `index.js` and run

```
npm run start
```

## Solution

This solution mimics the way most of us approach find-a-words, with a focus on the starting letter for the word and reading out in all directions from there.

### Algorithm
* Scan through the puzzle once per word
* For each word, scan through the puzzle space for each letter:
  * IF the letter being scanned is the same as the starting letter for our word:
    * investigate all directions (0 degrees, 45 degrees, ..., 315 degrees) to see if there are enough letters to span the word length, N; collect these strings for analysis
    * of the surviving N-length strings, see IF our word matches:
      * Match: report starting coordinates of our puzzle letter, and project end coordinates
      * Non-match: move on, nothing to see here

### Optimisations
* JavaScript is pass-by-reference for Objects (including strings), so passing large(er) objects around like our puzzle doesn't come with a register copy hit, so this should be fairly performant
* JavaScript has some very useful array and object iteration tools, which help with scoping and can even help schedule work concurrently (although _not_ in parallel; although see below for parallelism)
  * These tools _will_ always canvass the whole Array or Object, which you might want to abandon if you've already found your answer or are tracing down the wrong path. Good old trusty `for` loops allow for this kind of optimisation with `break`, `contiune` and `return` statements.
    * Caching the value of the `for` conditional (i.e. `let x = 0;x < object.length; x++`) prevents having to traverse the stack tree to get object lengths at runtime. This is an old-timey optimisation and is probably built into V8 by now, but I've left it in `(let x = 0, objectLength = object.length;x < objectLength; x++)`
    

### Possible optimisations
* **Words to puzzle space ratio:** This solution assumes the number of words to find is relatively small. If it were assumed to be large, the puzzle space would be canvassed once, and *any* matching first letter from our set of words would be queued for investigation.
* **Parallelism:** JavaScript has a heavy footprint for using multiple threads through Web Workers, but *if* there was a large enough number of words to find (and a much larger puzzle space), there is likely a point at which the payoff from working in separate threads will be beneficial.
  * Seeing as word investigation is atomic in this solution, Web Workers can be retrofitted quite easily
* **Text direction** During the problem definition we agreed that words are always LTR, so the RTL investigations (90–270 degrees) could be dropped by simply removing them from the DIRECTIONS constant. I've left them in for completeness.
* **Remove recursion**: Assembling each straight line of N-letter strings uses a recursive function—which although fun to code—introduces an overhead of memory allocation for a new stack frame with each entry call in JavaScript. If we were serious about performance we'd unfold this into a simple loop.