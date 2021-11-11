## Contributing to GMOT-SSG

GMOT-SSG welcomes contributions and suggestions of improvements!<br>

## GMOT-SSG guidelines

- Keep the GMOT-SSG quality
- Fix the repository issues
- If there is a feature that you think should be added to the project, first file and issue

## How to contribute?

- Fork the Project
- Clone the project
- Run "npm install"
- Create your branch (git checkout -b issueNumber)
- Add changed files (git add fileName)
- Run "npm run prettier" (Format your changes)
- Run "npm run lint" (Correct your code)
- Commit your changes (git commit -m 'Add/Fixing Something')
- Push to the branch (git push origin issueNumber)
- Open a Pull Request (PR should be directed to "main" branch)

## VSCode file

- The project will format on save

```
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
  "source.fixAll": true
  }
```

## Testing

- To run tests for the project you must type

```
npm run test
```

After all tests have been passed, and the code is indented, feel free to make a Pull Request.

You PR will be reviewed as soon as possible!
Thank you for your help!
