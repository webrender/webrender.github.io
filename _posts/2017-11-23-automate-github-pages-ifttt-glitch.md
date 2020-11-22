---
layout: post
date: November 23, 2017 at 02:30PM
title: "ifttt-ghpages: Automate your Github Pages blog"
social_preview: "/post_files/ifttt-social-preview.png?cb=1"
use_excerpt: true
description: "IFTTT supports hundreds of services and you can use any of them to automate your blog posts!  For this example, we're going to setup a trigger that automatically cross-posts new images from Instagram on our blog."
tags:
- IFTTT
- Github
- Glitch
---
## How to automate your Github Pages blog - for free - with IFTTT and Glitch ##

![](/post_files/ifttt-ghpages.png "ifttt-ghpages")

_Update 06/29: This article has been translated into Uzbek by GetColorings - check it out here: [http://getcolorings.com/uz-automate-github](http://getcolorings.com/uz-automate-github)

Earlier this month, I finally decided that it was time to migrate my personal blog from Tumblr to Github Pages.  The one thing holding me back was social media cross-posting;  On Tumblr, I had been using IFTTT to create new posts based on my social media sharing, but IFTTT doesn't natively support Github Pages.

To solve this problem, I created [ifttt-ghpages](https://glitch.com/~ifttt-ghpages), a small webhook you can run for free on [Glitch](https://glitch.com) that creates posts on Github Pages from IFTTT actions.

This blog uses ifttt-ghpages to integrate my activity from Github, Twitter, Instagram and Spotify. The great thing about IFTTT is its flexibility - IFTTT supports hundreds of services and you can use any of them to automate your blog posts!  For this example, we're going to setup a trigger that automatically cross-posts new images from Instagram on our blog.
<!--more-->


Some things to note before we continue:

* This guide assumes that you have already setup a Github Pages site, which is using the Jekyll site generator.  If you're unfamiliar with Github Pages, you should [create one first](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/) before moving on.

* ifttt-ghpages takes advantage of Github Pages' automated Jekyll build system - if you are pregenerating your site pages, or using a static site generator other than Jekyll, ifttt-ghpages does not currently support these use cases (although [pull requests](http://github.com/webrender/ifttt-ghpages) for new functionality are welcome!)

Let's start by creating a fork of ifttt-ghpages on Glitch.  Glitch calls forks "remixes".  Go to the [ifttt-ghpages preview](https://glitch.com/~ifttt-ghpages), and click **Remix your own** to create your own copy of the project.

![](/post_files/ifttt-ghpages-1.png "Glitch project preview")

Now that you've got your own copy of ifttt-ghpages, we'll need to specify the environment variables needed to run the app.  In glitch, the `.env` file contains your environment variables - and this file is special because only users you've invited to collaborate on your project can see the values within. This lets you store sensitive data in Glitch, such as API keys, without risk of exposing them to other users.

Open the `.env` file and you'll see 4 variables to set:

* `GH_USER`: your Github username.
* `GH_REPO`: the repo that contains your Github Pages
* `GH_TOKEN`: Your GitHub user token, which we will use to push new commits to your repo via the Github API. You can generate a user token [here](https://github.com/settings/tokens).
* `WEBHOOK_TOKEN`: A random token of your choice which we will specify in our requests from IFTTT in order to verify the request is not coming from someone else. This token can be anything but I reccomend generating a UUID using a site such as [https://www.uuidtools.com](https://www.uuidtools.com).

That's all the setup necessary in Glitch. Hold onto the project name Glitch gave you, as well as the `WEBHOOK_TOKEN` you set - we're going to need them when we setup IFTTT. If you'd like, you can change the project name to something easier to remember.

OK, now that we have Glitch setup properly, let's create a new trigger in IFTTT - IFTTT calls these Applets.  Login to IFTTT and create a **New Applet**.

![](/post_files/ifttt-ghpages-2.png "IFTTT New Applet")

On the new applet page, select the **this** link and choose **Instagram** for your service, then the trigger **Any new photo by you**.  for the **that** action, choose the *Webhooks* service, then the trigger **Make a web request**. Setup your webhook as follows:

* **URL**: `https://YOUR-PROJECT-NAME.glitch.me/?token=YOUR-TOKEN` - use the project name and **WEBHOOK_TOKEN** variables from the Glitch project we created earlier.

* **Method**: `POST`

* **Content Type**: `text/plain`

* **Body**: A YAML-formattted Jekyll document, with newlines replaced with `|||`. There are several examples specified in this project's [Github repo](https://github.com/webrender/ifttt-ghpages/examples), but here's the example for Instagram: `{% raw %}---|||layout: post|||title: {{Caption}} - Tweet|||network: instagram|||date: {{CreatedAt}}|||---|||{{EmbedCode}}{% endraw %}`

_Technical note:  Initially I had built ifttt-ghpages to accept JSON, but had trouble escaping JSON & newlines properly with IFTTT so I've instead used the format above._

And you're all set! Now when you create a post on instagram, you'll notice a new commit to your Github Pages repo shortly afterwards:

![](/post_files/ifttt-ghpages-3.png "New commit on Github")

As I mentioned earlier, the possibilities are only limited by the number of services & triggers IFTTT supports. Some ideas based on other IFTTT triggers:

* **SMS**: Post to your blog from your mobile phone
* **Google Assistant**: Post to your blog with your voice
* **Pocket**: Post to your blog when you save an article
* **Phillips Hue**: Sync your website background with your current lighting
* **Nest Cam**: Post an image to your blog when your camera sees motion
* **Trello**: use a trello board as a backend for your blog posts
