# Scraping-google-maps

Capture google maps search information

### Prerequisites

```
* Nodejs
```

### Installing

Open the terminal and execute the commands

- clone repository

```
git clone https://github.com/thiagosimaome/Scraping-google-maps.git
cd crawlerNodejs
```

- install packages

```
npm install
```

## Config url

search for an establishment type in google, enter more places and copy the url in the project configuration file, following the same pattern:

- path config file

```
  Scraping-google-maps/config/conf.js

  -- conf.js
  url: <past_url>
```

### Scrap information

```
npm start
```

- The result will be placed in a file inside the 'scrap/results' folder of the project with the name of scrap_data.txt

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [(maps Scrapping search information)](https://github.com/your/project/tags).

## Author

- **Thiago jose de almeida simao** - [Git](https://github.com/thiagosimaome)

## Acknowledgments

- Inspiration
  - sometimes we need some quick and massive contacts, so the initiative to create and scrap information from the largest Google search engine
