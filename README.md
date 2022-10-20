# GMOT-SSG - Static Site Generator

## What this tool does?

This tool will receive a input txt file(files) or directory(directories) and transform it in an HTML page(pages).

## How to Install?

To install our package, you need to type the following line in your console:

```
npm i gmot-ssg
```

# For Example:

```
example.txt:

"I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn
of last year, and found him in deep conversation with a very stout,
florid-faced, elderly gentleman, with fiery red hair. With an apology
for my intrusion, I was about to withdraw, when Holmes pulled me
abruptly into the room and closed the door behind me."
```

will become:

```
example.html

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<body>
  <h1>example</h1>
  <p> "I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn
    of last year, and found him in deep conversation with a very stout,
    florid-faced, elderly gentleman, with fiery red hair. With an apology
    for my intrusion, I was about to withdraw, when Holmes pulled me
    abruptly into the room and closed the door behind me."</p>

</body>
</html>
```

# How do I use it?

```
  To use this tool, you need to type in the CLI the following:
  npx gmot-ssg -i <file> -o <output> -s <stylesheet>

  examples:
  npx gmot-ssg -i text.txt text2.txt -o C:\user\example\output -s stylesheetlink
  npx gmot-ssg -input directory1 directory2 -output outputFolder  -stylesheet stylesheetlink
  npx gmot-ssg -i text.txt directory1 text2.txt C:\user\example\directory2
  npx gmot-ssg -c ssg-config.json
```

By default, this tool will create a "dist" directory in its folder where the output will be.

# What options does it have?

```
This tool has an
-s --stylesheet option, which will take your input stylesheet link and place it inside the HTML.
-o --output option, this option will place the output in your custom output directory.
-v --version option, will display the current version of the program.
-l --language option, will let you set the language for the HTML.
-h --help option, will display the usage, options, and examples.
-c --config option, will read the config JSON file for arguments instead of command line.
```

What optional features does it have?

```
<Title> and <h1> tags
 -s -stylesheet for custom css links
 -o --output for custom output paths
 -l --language for custom HTML language, default is en-CA.
 It also accepts mixed input, txt files, md files and directories.
```

# Additional support for md (markdown) files

| MD File                         | HTML File                                  | Webpage                       |
| ------------------------------- | ------------------------------------------ | ----------------------------- |
| `**Bold Text**`                 | `<b>Bold Text</b>`                         | **Bold Text**                 |
| `*Italic Text*`                 | `<i>Italic Text</i>`                       | _Italic Text_                 |
| `# H1 Heading`                  | `<h1>H1 Heading</h1>`                      | <h1>H1 Heading</h1>           |
| `## H2 Heading`                 | `<h2>H2 Heading</h2>`                      | <h2>H2 Heading</h2>           |
| `[GitHub](https://github.com/)` | `<a href="https://github.com/">GitHub</a>` | [GitHub](https://github.com/) |
| `---`                           | `<hr />`                                   | <hr />                        |

# For Example (md files):

```
README Excerpt


# [GMOT-SSG](https://github.com/GMOTGIT/GMOT-SSG)

OSD600 0.1 - SSG

## SSG - Static Site Generator

## What this tool does?

This tool will receive a **input txt file(files)** or **directory(directories)** and transform it in an *HTML page(pages)*.
```

will become:

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>README Excerpt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<body>
<h1>README Excerpt</h1>
<p><h1><a href="https://github.com/GMOTGIT/GMOT-SSG">GMOT-SSG</a></h1></p>
<p>OSD600 0.1 - SSG</p>
<p><h2>SSG - Static Site Generator </h2></p>
<p><h2>What this tool does?</h2></p>
<p>This tool will receive a <b>input txt file(files)</b> or <b>directory(directories)</b> and transform it in an <i>HTML page(pages)</i>.</p>

</body>
</html>
```
