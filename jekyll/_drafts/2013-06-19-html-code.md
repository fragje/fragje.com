---
layout: post
title:  "Html code test"
date:   2013-06-19 21:56:46
categories: coding
summary: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.
---

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight html linenos %}
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>A little about me | fragje</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Web fonts -->
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,200italic,300italic,400italic,600italic' rel='stylesheet' type='text/css'>


    <link rel="stylesheet" href="css/style.css">

    <!-- Hide ios address bar -->
    <script>
     window.addEventListener("load",function() {
       setTimeout(function(){
        window.scrollTo(0, 0);
        }, 0);
     });
    </script>

    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
  </head>
  <body>

    <div class="constrained">
      
      <div class="header">
        <h1 class="logo"><a href="#">Fragje</a></h1>
      </div> <!-- Header -->
      
      <div class="main-content" role="main">
        <h1 class="page-title">Hi there</h1>
        <div class="frame-circle half-max-right">
          <img src="img/frank-gjertsen.jpg" alt="Frank Gjertsen">
        </div>
        <p>I'm Frank Gjertsen, a web designer and front-end developer from Norway. I made my first website in 2005, and have ever since been inspired by the technology, community and possibilities.</p>

        <p>I currently work full time at <a href="http://www.frontkom.no" title="http://www.frontkom.no">FrontKom</a> in Fredrikstad, and did freelance before that.</p>

        <h2>Give some back</h2>
        <p>I always try to improve usability, accessibility and quality of my work. And there is always something new to learn.</p>

        <p>This blog is my attempt to write about what I learn, mainly because I think that makes me learn better, but I also want to share something back to the community that have given me so much.</p>

        <h2>Contact me</h2>
        <p>Got any questions or comments, feel free to <a href="mailto:frank.gjertsen@gmail.com">email me</a>  or send me a tweet <a href="https://twitter.com/fragje" title="https://twitter.com/fragje">@fragje</a></p>
      </div> <!-- Main content -->
    </div> <!-- Constrained -->

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>

    <script src="js/main.js"></script>

    <script>
        var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
  </body>
</html>

{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
