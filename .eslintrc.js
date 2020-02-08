module.exports = {
  "extends": [
    "airbnb",
  ],
  "plugins": [
    "jest"
  ],
  "env": {
    browser: true,
    jest: true,
  },
  "settings": {
    "react": {
      "version": "detect",
    },
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  },
  "ignorePatterns": [
    "src/index.js",
    "src/serviceWorker.js",
  ],
  "rules": {
    "import/prefer-default-export": 0,
    "max-len": [1, 120],
    "no-case-declarations": 0,
    "no-param-reassign": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-fragments": 0,
    "react/jsx-props-no-spreading": 0,
  },
};
