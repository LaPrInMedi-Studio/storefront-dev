# storefront-framework


[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/storefront-framework/badge)](https://www.codefactor.io/repository/github/ecomclub/storefront-framework)
[![npm version](https://img.shields.io/npm/v/@ecomplus/storefront-framework.svg)](https://www.npmjs.org/@ecomplus/storefront-framework)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Webpack](https://webpack.js.org/) based
tool to develop and build
[JAMstack](https://jamstack.org/) &
[PWA](https://developers.google.com/web/progressive-web-apps/)
e-commerce templates with
[E-Com Plus APIs](https://developers.e-com.plus/docs/reference/)

## Getting started

First things first, install the module as dev dependency:

```bash
npm i --save-dev @ecomplus/storefront-framework
```

> Note: while you can install and run `storefront-pack` globally,
we recommend installing it locally.

### Commands

- `storefront-pack serve`:
Starts Webpack development server on port _9123_ (http://localhost:9123);
- `storefront-pack build`:
Compile assets bundles for production and prerender e-commerce pages;

#### Optional arguments

- `--port=8080`:
Change the dev server port number, you may replace _8080_ by what you want;
- `--verbose`:
Detailed output of Webpack compilation process;

### NPM scripts

NPM `package.json` scripts are a convenient and useful means to run
locally installed binaries without having to be concerned
about their full paths. Simply define a script as such:

```json
{
  "scripts": {
    "serve": "storefront-pack serve",
    "build": "storefront-pack build"
  }
}
```

And run the following in your terminal/console:

```bash
npm run serve
```

Building for production:

```bash
npm run build
```

## Pages CMS

You should use a CMS for the store pages,
we recommend [Netlify CMS](https://www.netlifycms.org/) and provide
an starter
[`config.yml`](https://github.com/ecomclub/storefront-framework/blob/master/template/public/admin/config.yml)
file.

All **content must be JSON**, saved on `content` folder.

## Template parameters

CMS content will be parsed to object and used as
template data object when compiling [EJS](https://ejs.co/) files:

- `content/settings.json` will be parsed to:

```json
{
  "settings": {
    "name": "My Shop",
    "example": "any"
  }
}
```

- `content/pages/home.json` will be parsed to:

```json
{
  "pages": {
    "home": {
      "example": "any"
    }
  }
}
```

And you can use it on EJS view as:

```ejs
<%= settings.name %>
```

Besides the CMS content, `slug` (the current page slug),
`md` ([markdown-it](https://github.com/markdown-it/markdown-it) instance)
and [`partial`](#templateviewspartials) (function)
are properties of template data.

### Parsing markdown content

Some of your CMS content may be saved as markdown,
on EJS views you can render it to HTML by using `md.render` function,
eg.:

```ejs
<%= md.render(pages.home.md_content) %>
```

### Including partial templates

You may include partial template files (inside _partials_ folder)
with EJS calling the `partial` function, eg.:

```ejs
<%= partial('components/header') %>
```

[More info](#templateviewspartials).

## Starter template

We also provide
[this open source template](https://github.com/ecomclub/storefront)
as a boilerplate, so you don't need to
start from scratch :wink:

It's a complete e-commerce template with few dependencies,
you may change what you need to setup your own theme and scripts.

## Project structure

To work with this framework,
your template project **must** have the following file structure:

### Basic directory tree

```
├── content
└── template
    ├── assets
    ├── js
    ├── public
    │   ├── admin
    │   └── img
    │       └── uploads
    ├── scss
    │   └── storefront-twbs
    │       └── theme
    └── views
        ├── partials
        └── pages
```

#### `/content`

Root directory for Netlify CMS (or any other headless CMS)
[collections](https://www.netlifycms.org/docs/add-to-your-site/#collections)
JSON content.
You may create and/or edit content here to preset
some content for examples or defaults.

[`settings.json`](https://github.com/ecomclub/storefront-framework/blob/master/content/settings.json)
is required and must have at least the
properties preseted as default.

#### `/template`

Source template files.
All JS, SCSS, images and other assets files should be placed here.

#### `/template/assets`

Predefined template assets (such as images, videos, sounds...)
that should be imported inside `js` or `scss` files.

#### `/template/js`

JS source files,
[`index.js`](https://github.com/ecomclub/storefront-framework/blob/master/template/js/index.js)
is required,
other files and modules should be imported from index.

#### `/template/public`

Any static assets placed in the `public`
folder will simply be copied and not go through Webpack.
You need to reference them using absolute paths.

#### `/template/public/admin`

Setup for [Netlify CMS](https://www.netlifycms.org/),
is optional if you're not planning to use the the referred CMS.

[`config.yml`](https://github.com/ecomclub/storefront-framework/blob/master/template/public/admin/config.yml)
should be
[configured](https://www.netlifycms.org/docs/add-to-your-site/#configuration)
following your template options and features.
The settings collection (file `content/settings.json`)
must have at least the preseted fields.

#### `/template/public/img`

Place default favicon and app icons here.

#### `/template/public/img/uploads`

Netlify CMS
[media](https://www.netlifycms.org/docs/add-to-your-site/#media-and-public-folders)
on `uploads` folder, where the merchant may
upload custom logo, banners, icons and other assets from
CMS dashboard.

#### `/template/scss`

[SCSS](https://sass-lang.com/)
to compile CSS stylesheet,
[`styles.scss`](https://github.com/ecomclub/storefront-framework/blob/master/template/scss/styles.scss)
is required, other files and modules
should be imported inside it.

#### `/template/scss/storefront-twbs/theme`

[Custom storefront Bootstrap theme](https://github.com/ecomclub/storefront-twbs#creating-custom-theme),
`_components.scss` and `_variables.scss` are required.

#### `/template/scss/storefront-twbs/theme/assets`

Place here the static files
that should be imported on storefront-twbs
`_components.scss` or `_variables.scss` files.

#### `/template/views`

[EJS](https://ejs.co/) markup to compile HTML files.

#### `/template/views/partials`

EJS partials to be included on pages, receiving all parsed
CMS content and optionally additional arguments.
Import the partial by filename with paths
(ignore paths until the `partials` dir)
and without extension, eg.:

```ejs
<%= partial('head', { title: 'Hello World' }) %>
```

```ejs
<%= partial('components/header') %>
```

#### `/template/views/pages`

EJS views to compile HTML pages, predefined files:

```
├── index.ejs
├── _brands.ejs
├── _categories.ejs
├── _collections.ejs
└── _products.ejs
```

The above files are required,
with the specified names. They have to be in the
root of `pages` directory.

To complete the storefront template,
you should also create other EJS views.
It's possible to use as many pages as you want,
and you can choose any filenames.

#### `/template/views/pages/_cms`

EJS views for
[folder collections](https://www.netlifycms.org/docs/collection-types/#folder-collections),
witch produces multiple slugs.

For example, for a blog folder collection on folder `content/blog-posts`,
you should have a view `_cms/blog-posts.ejs`, it will generate an HTML page for each
post saved by CMS.

## Deploy with Netlify

As a JAMstack app, your template may be easily deployed with Netlify,
to do that you should add a simple
[netlify.toml](https://github.com/ecomclub/storefront-framework/blob/master/netlify.toml)
file and a
[deploy button](https://www.netlify.com/docs/deploy-button/) with **link to your
template repository** and
`stack=cms` param (considering you're using Netlify CMS).

### Sample

```md
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-framework)
```

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?stack=cms&repository=https://github.com/ecomclub/storefront-framework)
