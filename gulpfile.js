const gulp = require("gulp");
const rename = require("gulp-rename");
const purgecss = require("gulp-purgecss");

gulp.task("purgecss", () => {
  return gulp
    .src("assets/css/*.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      purgecss({
        content: ["./*.html"],
      })
    )
    .pipe(gulp.dest("assets/css/"));
});
