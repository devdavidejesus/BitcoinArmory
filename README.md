# Bitcoin Armory website

Source of [btcarmory.com](https://btcarmory.com), the website of the open-source
[Armory](https://github.com/goatpig/BitcoinArmory) Bitcoin wallet. It is a Jekyll
site published by GitHub Pages from the `gh-pages` branch. The `github-pages` gem
in the `Gemfile` gives you the same Jekyll version and plugins that GitHub Pages uses.

## Building locally

You need Ruby 3.x and Bundler.

    git clone -b gh-pages https://github.com/goatpig/BitcoinArmory.git armory-site
    cd armory-site
    bundle install
    bundle exec jekyll serve

Open http://127.0.0.1:4000. Pages rebuild automatically when you save; restart the
server after editing `_config.yml`.

## Layout

- `_posts/`: release notes (`category: releases`) and news (`category: news`)
- `docs/`, `contribute/`, `about.md`, `contact.md`: site pages
- `_layouts/`, `_includes/`, `_sass/`, `images/`: templates, styles and assets
- `images/social/`: preview images used when pages are shared on social media.
  A post can use its own with `image:` in its front matter.

## Contributing

Open a Pull Request against the `gh-pages` branch.
