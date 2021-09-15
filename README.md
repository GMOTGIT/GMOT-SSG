# GMOT-SSG
OSD600 0.1 - SSG

## SSG - Static Site Generator 


## What this tool does?
  This tool will receive a input txt file(files) or directory(directories) and transform it in an HTML page(pages).
  
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
  node GMOT-SSG.js -i <file> <option> 
  
  examples:
  node GMOT-SSG.js -i text.txt text2.txt -o C:\user\example\output -s stylesheetlink
  node GMOT-SSG.js -input directory1 directory2 -output outputFolder  -stylesheet stylesheetlink
  node GMOT-SSG.js -i text.txt directory1 text2.txt C:\user\example\directory2   
  ```
  
By default, this tool will create a "dist" directory in its folder where the output will be.
  
  # What options does it have?
  ```
  This tool has an
  -s --stylesheet option, which will take your input stylesheet link and place it inside the HTML.
  -o --output option, this option will place the output in your custom output directory.
  -v --version option, will display the current version of the program.
  -h --help option, will display the usage, options, and examples.
  
  ```
  What optional features does it have?
  ```
  <Title> and <h1> tags
   -s -stylesheet for custom css links
   -o --output for custom output paths
   It also accepts mixed input, txt files and directories.
   ```
    
    

  
  
