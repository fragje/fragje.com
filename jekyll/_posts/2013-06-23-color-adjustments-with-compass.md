---
layout: post
title:  "Color adjustments with compass"
date:   2013-06-23 12:00:00
comments: true
categories: blog post
tags: compass, sass, css, color
summary: Adjusting colors with a css preprosessor like LESS and Sass is really great, but the result is not always how you would expect. I explore alternatives to the lighten and darken functions, and compass have a few tricks up its sleeve.
---

When I fist started using css preprocessors like [LESS] and [Sass], storing colors in variables was on of the first "oh-yeah this is how css should be" I had. Shortly after I learned about the lighten and darken functions where you set your source color, and give it a percentage value of how much lighter or darker you want it.

This is super handy when dealing with different states of `<a>` tag's. Both `:hover` and `:active` having a lighter and darker color based upon one color source stored in a variable.

{% highlight scss %}
$colorLink: #3D97B8;

a:hover {
  color: lighten($colorLink, 20%); // #85C0D6
}
{% endhighlight %}

## Get more control
While lighten and darken are great, they don't output what you would expect in every situation. In those cases compass have two additional functions that adjust your colors relative to your base color. `scale-lightness` and `scale-saturation`, both takes a positive or negative value.

{% highlight scss %}
a:hover {
  // Lighten $colorLink 20 steps
  color: scale-lightness($colorLink, 20) // #60AECA
}

a:active {
  // Desaturates $colorLink 20 steps
  color: scale-saturation($colorLink, -20); 
}
{% endhighlight %}

## Take full control
If you need full control, sass have `scale_color` function where you can mix several properites.
  
- `$saturation` 
- `$lightness`
- `$alpha`
- `$red`
- `$green`
- `$blue`

{% highlight scss %} 
a:hover {
  color: scale_color($colorLink, $saturation: -20%, $lightness: 20%) // #6AA9C0
}
{% endhighlight %} 

## References
- [Sass lighten function]
- [Compass color functions]
- [Sass scale_color function]

[LESS]: http://lesscss.org
[Sass]: http://sass-lang.com
[Sass lighten function]: http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#lighten-instance_method
[Compass color functions]: http://compass-style.org/reference/compass/helpers/colors/
[Sass scale_color function]: http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#scale_color-instance_method
