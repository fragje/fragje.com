---
layout: post
title:  "Sass Sourcemaps in Chrome"
date:   2015-03-21 09:00:00
comments: true
categories: blog post
tags: sourcemap, sass, gulp
summary: I tried it before, Sourmaps sounded amazing, like the future I wanted to have! However, it didn't work for me last time, partly because of Compass, partly because it was at a early stage. Now however, the technology have evolved, I'm past the compass days and Libsass and Gulp are my new best friends.
---

When I first saw Paul Irish [demo Sass sourcmaps][1] back in 2013, I was excited to see how easily he worked with styles within Chrome. No need for switching back and forth between a text editor and the browser anymore!

## Sass inside Chrome
When writing Sass in a modular way, there will be quite a few Sass files with little code in each file. This is good for organizing code, but it can sometimes be hard to find which file specific styles are written in. Especially in a large code base, or if you are new to a project. 

With sourcemaps we inspect DOM elements as usual, but it will refere to a *.scss* instead of a compiled *.css* file. This is where the code actually lives.

<figure>
    <img src="/assets/img/content/chrome-sourcemap-reference.png" alt="Sass sourcemap reference in Chrome">
    <figcaption>When we inspect a element on the page, we get a reference to which file and line number the styles where written.</figcaption>
</figure>

## Develop inside Chrome
Now that we know which file our style live, we can open it up in any text editor, do the change and then come back to Chrome. 

But the nice thing about sourcemaps is you don't need to do that. Instead of leaving Chrome we could rather click on the referenced file. It would open up inside Chrome, and from here we could modify our styles. No need to open up a text editor.

<figure>
    <img src="/assets/img/content/chrome-sourcemap-source.png" alt="Sass file open in chrome dev tools">
    <figcaption>Sass files can be modified inside Chrome just like you would in a text editor.</figcaption>
</figure>

I would say this i pretty cool. Easy access to source Sass files, and beeing able to update within the browser!

Sadly all this needs a bit of setup. Let me show how I have setup sourcemaps with libsass in a gulp task.

## Setting up Sass Sourcemaps with Gulp
The outline of our sass task in Gulp is pretty simple:

1. Select the source sass files
1. Initialize sourcemaps
1. Process the *.scss* files to *.css* with [gulp-sass] (Libsass)
1. Add sourcemaps to our css file
1. Store the finished css file

If you are new to node.js, there are a few things you need to get up and running. 

### Installing Node.js and node packages
1. We need Node.js, which I recomend installing trought [Homebrew]. It can also be installed from the [Node.js homepage][node.js]. When installing node.js we'll get **npm** which we will use to install node packages.
1. We need a *package.json* file in our project folder to store all the node plugins we are going to use. A quick way to make this would be to open Terminal in the project root and run `$ npm init`. You will go trough a few steps, and when finished it's ready for packages to be installed.
1. Three node packages are required for what we are doing. To install these and save them as dependencies, we will run `$ npm install gulp gulp-sass gulp-sourcemaps --save-dev`.  
Dependencies are added to package.json, and the plugins are saved in a new folder called *node_modules*. (If working with git, it's a good idea to ignore the *node_modules* folder.)


### Configure sass and sourcemap in Gulp
Now that we have the tools, next step is to create a task in Gulp.

1. Create a new file called *gulpfile.js* in same folder as *package.json* lives.
2. Inside *gulpfile.js*, require the installed node packages at top.
3. Add a new task called *sass*. This task will do what is [outlined earlier][2], and this is how the file will look like:

{% highlight javascript %}
// Require node packages
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

// Sass tasks
gulp.task('sass', function () {
    gulp.src('./source/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(errLogToConsole: true))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/css'))
});
{% endhighlight %}  

From the Terminal we can now run `$ gulp sass`, and well'll have a compiled *css* file with sourcemaps inlined.

We can even do a little more, just to make life easier:

{% highlight javascript %}
// Watch task
gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
{% endhighlight %}

The **watch** task will run the *sass* task whenever a *.scss* file is saved. The **default** task will run both the *sass* and *watch* task. The *default* task is triggered just by running `$ gulp` from the Terminal.

## Enable sourcemaps in Chrome
Now that we have our tasks up and running, there is a few remaining steps we need to do in Chrome. 

First off we need to make sure CSS sourcemap is enabled. Head over to Chrome, open up developer tools and then open up settings (gear icon on top right). 
<figure>
    <img src="/assets/img/content/chrome-sourcemap-enable.png" alt="Enable sourcemap settings in chrome">
</figure>

While we are still in the settings, we need to make sure Chrome have access and permission to write to our local files. Select *Workspace* in the left menu. Click *Add folder...* and we'll add the folder our local project folder.
<figure>
    <img src="/assets/img/content/chrome-sourcemap-workspace.png" alt="Enable sourcemap settings in chrome">
    <figcaption>Note that when adding a folder to Workspace, we'll get asked if we are sure.</figcaption>
</figure>

Now we need to connect our local files. Select *sources* at the top row. 

1. Open the local project folder we just added to our workspace.
2. Right click the main style file in our project and select *Map to network resource*. 
3. Select the matching file that is served by the browser.
<figure>
    <img src="/assets/img/content/chrome-sourcemap-map-to-network.png" alt="Enable sourcemap settings in chrome">
</figure>

Well done!

Now when we inspect elements on the page, we will get a reference to the source file as shown earlier. By clicking on the source file (_buttons.scss), or even *cmd* click on a css property, we will be heading over to *Sources* and the referenced file will be viewed. Now changes can be done directly from Chrome without needing to open a separate text editor.
<figure>
    <img src="/assets/img/content/chrome-sourcemap-new-styles.png" alt="Enable sourcemap settings in chrome">
    <figcaption>Working with stylesheets directly inside Chrome developer tools.</figcaption>
</figure>
We can also navigate trough our files in the left column on *Sources*, or even better: press *cmd* + *p* and we have quick access to all files in our workspace.


## Conclution
Sass sourcemaps are a great tool for improving productivity on a web project. For smaller sites where you know every css line by heart this will maybe not be that useful, but on larger projects and especially when working together on a team I see this as a huge benefit. 

I will definently not uninstall my text editor, but I will for sure spend more time doing css work within Chrome. 

[1]: https://youtu.be/x6qe_kVaBpg?t=6m28s
[2]: #setting-up-sass-sourcemaps-in-gulp
[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[gulp-sass]: https://www.npmjs.com/package/gulp-sass
[gulp-sourcemaps]: https://www.npmjs.com/package/gulp-sourcemaps
[gulp-autoprefixer]: https://www.npmjs.com/package/gulp-autoprefixer
[node.js]: https://nodejs.org/
[homebrew]: http://brew.sh/
*[npm]: node package manager