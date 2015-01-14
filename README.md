## TODO
### MUST-DO
- [ ] project not getting rebuilt properly in watch tasks.
      need to structure so that notify is part of dev task,
      and just call dev task from watcher.
        - or maybe put notifications within each task,
      with global option to switch on/off notify?
          - better yet, notify config obj with global and on/off for each task.
      --> currently rebuilding all on each watcher task;
          should only rebuild minimum necessary for each task.
          js and templates must both call require, to ensure compiled templates are compressed and copied,
          but css shouldn't need require...
- [ ] css is not getting minified.
      (see also below: source mapping for css)
- [X] templates (Handlebars linting?)
      http://danburzo.ro/grunt/chapters/handlebars/
      got handlebars precompiling and i believe define/requiring them into WebdevBoilerplate is working,
      but i get an error that Handlebars is undefined, so setup in main.js is missing something.
  - [X] do i need to specify an amd option to define/require templates as a module? (https://github.com/gruntjs/grunt-contrib-handlebars#amd)
      ---> YES! needed, or `Handlebars` is not available to the compiled template.

### BONUS
- [ ] Not yet watching index.html (static files?)
- [ ] Enable source mapping
  - [X] JS (via require/generateSourceMaps)
  - [ ] CSS
- [ ] mock out sample modules
  - [X] static module
  - [ ] inheritance-based module: http://www.bennadel.com/blog/2320-extending-classes-in-a-modular-javascript-application-architecture-using-requirejs.htm
- [ ] use templates for filesets
  - [ ] possible to use globbing for `dest:`? (ask SO.)
    - [ ] SASS: because we're using `expand: true` in sass config,
          just pointing watch at sass.dev.src isn't enough.
          how can i concat cwd+src?
          (using expand + cwd + src in watch:css doesn't work.)
    - [ ] html: same deal as with SASS.
- [ ] imagemin?
- [ ] htmlmin? (instead of `copy`)
- [ ] clean? (out of the box or a grunt-contrib for this?)
- [ ] pure.css, or some other reset

### DONE
- [X] grunt copy index.html (and other files)
      (or can require do this?)
- [X] local file server (via grunt-contrib-connect)
- [X] notify
    - [X] get it working
    - [X] silence notify tasks in console
          (don't need to see 'Running "notify:jshint" (notify) task')
- [X] uglify settings
      looks like i can do this via require.js:
      https://github.com/jrburke/r.js/blob/master/build/example.build.js#L156
      - [X] uglify or uglify2?
      - [X] how do sourcemaps interact with uglify?
- [X] jshint
    - [X] 0 files linted
    - [X] are my tasks set up correctly to share options?
- [X] SASS
    - [X] compile for dev/deploy
- [X] watch
    - [X] recursive something going on here...fix it.
