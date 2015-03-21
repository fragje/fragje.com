---
layout: post
title:  "SVG sprites"
date:   2014-05-04 09:30:00
comments: true
categories: blog post
tags: svg, sprite
summary: Over the years I have been using several techniques to do ui graphic in front-end development. Lately I have used svg-sprites, and this is how I made it work on my web site.
---

Over the years I have been using several techniques to do ui graphic in front-end development. From having separate `.png` files for every image, to manually create image sprites, to letting [compass gererate image spries][compass-sprite] for me, to creating customized icon-fonts using tools like [IconMoon] and [Fontastic].

The latter technique solved the issue with retina displays nicely, and it made resizing and changing colors easy just by using css.

## SVG vs icon-fonts
The big question, – is icon-fonts the best technique? Lately I have read and heard about people prefere to use `.svg` insted of icon-fonts. To be honest I have never been working with `.svg`'s that mouch, and to my lack of experience I did not know it was possible to create sprites in svg.

After listening to [episode 16 of Ctrl Click Cast][ctrlclickcast] with Ben Frain, I read a blogpost on Ben Frain's website about [icon-fonts vs SVG's][benfrain-blog]. In this blog post I discovered how I could setup Grunt to generate svg-sprites, and it would even generate `.png` fallback for browsers that does not support `.svg`.

## My setup

### Installation
Firs off you'll need to have a working [grunt setup].

Secondly install [grunt-dr-svg-sprites]. Type the following command in your terminal.

{% highlight bash %}    
npm install grunt-dr-svg-sprites --save-dev  
{% endhighlight %}

This will add the plugin to your `package.json` file.

After the plugin is installed the following line have to be added to your `Gruntfile.js`
    
{% highlight js %}    
grunt.loadNpmTasks('grunt-dr-svg-sprites');
{% endhighlight %}

### Configuration
On my site I chose to replace all previous ui-elements plus logo from `.png` and image-sprites to one svg-sprite. The generated svg-sprite contains graphic in different sizes, and that is all handled automaticly by the grunt plugin.

I have a folder where I put all my `.svg`'s and choose where the generated svg-sprite will be located. Additionally I configured how I wanted the css to be generated and stored.

{% highlight javascript %}
// Configure svg-sprites
"svg-sprites": {
  options: {
    spriteElementPath: "img/svg",
    spritePath: "img/sprites",
    cssPath: "_sass/components",
    prefix: "ui",
    cssPrefix: "_ui",
    cssSuffix: "scss"
  },
  icons: {
    options: {
      sizes: {
        large: 20,
        small: 10
      },
      refSize: 10,
      unit: 20
    }
  }
}
{% endhighlight %}  

Note that the above configuration indicates that the original `.svg` files is put in the folder `img/svg/icons`. (The plugins documentation can be read at the [svg-sprites Github page][grunt-dr-svg-sprites].)

My configuration is also set to generate a sass file named `_ui-icons-sprites.scss`, and I place it to fit inside my existing sass file structure. 

When I want to use any image from my sprite, I simply extends the generated css with Sass `@extend`.

{% highlight scss %}
.toggle-nav:before {
  @extend .ui-plus-small;
  content: "";
  position: absolute;
  left: 1em;
  top: 1em;
}
{% endhighlight %}

The generated css will look for a css class named `svg` in your markup, and then use `.svg` or `.png` depending on browser suppport. I use [Modernizr] that adds this class.

## Summary
So there you go:

- Small file size
- One http request for all images
- Sharp on retina and high resolution displays 
- and last but not least, fallback for browsers that not support svg images

I'm excited to learn more about svg's, and think there will be more use of svg's than icon-fonts in near future. Lastly I recomend listening to [SVG with Doug Schepers by *The Web Ahead*][web ahead podcast svg], a podcast by Jen Simmons. 

[iconmoon]: http://icomoon.io/
[fontastic]: http://fontastic.me/
[compass-sprite]: http://compass-style.org/reference/compass/helpers/sprites
[ctrlclickcast]: http://ctrlclickcast.com/episodes/sass-workflows-setup-automation
[benfrain-blog]: http://benfrain.com/image-sprites-data-uris-icon-fonts-v-svgs/
[grunt setup]: http://gruntjs.com/getting-started
[grunt-dr-svg-sprites]: https://github.com/drdk/grunt-dr-svg-sprites
[Modernizr]: http://modernizr.com/
[web ahead podcast svg]: http://5by5.tv/webahead/67