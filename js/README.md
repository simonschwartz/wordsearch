# Word Search

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A word search project for staff members within the Content Discovery team.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## About The Project

The solution presented here works on the principal of fast mapping - that is: assume that all starting positions are a potential solution to the problem, and try to elimnate those that can't be, as quickly and officially as possible.

For each cell in the table, for each word being searched for:

1. does the cell contain the first letter of the word?
2. if no - not the start of a solution
3. if yes - reach out in each "direction" defined (see below)
4. is there room, in that direction, to fit an answer?
5. if no - not the start of a solution
6. it yes - step into next cell, interactively, until either the wrong letter is found, or you rach the end of the work
7. if the wrong letter is found, this is not a solution
8. if the end of the word is found, this is a solution and it can be recorded in the return value


### Directions

Directions are defined as points on a compass.

East (left-to-right), North East (diagonally bottom-to-top-and-left-to-right), North (bottom-to-top) etc.

PLEASE NOTE - the current list of directions includes the "backwards" possible solutions, in all 8 campass directions - and thus an "extra hard" test option has been added into the testing.

To remove these options, just delete them from the object in the `utils.js` file.


<!-- GETTING STARTED -->
## Getting Started

```
npm run start
```
### Prerequisites

Install Node https://nodejs.org/en/download/

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Install dependencies with:

```
npm i
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

To be a part of the challenge:

1. Clone the Project
2. Create your Feature Branch (`git checkout -b my-username-here`)
3. Commit your Changes (`git commit -m 'add a solution'`)
4. Push to the Branch (`git push origin my-username-here`)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Simon Schwartz - swartz.simon@abc.net.au

Project Link: [https://github.com/simonschwartz/wordsearch](https://github.com/simonschwartz/wordsearch)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

