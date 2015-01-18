define(['handlebars'], function(Handlebars) {

this["webdevBoilerplate"] = this["webdevBoilerplate"] || {};

this["webdevBoilerplate"]["footer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<footer>\n	<div id=\"footer-left\">\n		Transmote is Eric Socolofsky.<br/>\n		<p id=\"footer-left-oneline\">\n			<a href=\"#\" class=\"modal-about\">About</a>.&nbsp;&nbsp;<a href=\"#\" class=\"modal-contact\">Contact</a>.&nbsp;&nbsp;<a href=\"http://words.transmote.com/\">Words</a>.&nbsp;&nbsp;<a href=\"http://twitter.com/ericsoco/\">Characters.</a>&nbsp;&nbsp;<a href=\"http://flickr.com/ericsoco/\">Images</a>.&nbsp;&nbsp;<a href=\"http://vimeo.com/ericsoco/\">Videos</a>.\n		</p>\n	</div>\n	<div id=\"footer-right\">\n		<div id=\"footer-right-img\">\n			<a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\" target=\"_blank\"><img alt=\"Creative Commons License\" style=\"border-width:0\" src=\"http://i.creativecommons.org/l/by-sa/3.0/88x31.png\" /></a>\n		</div>\n		<div id=\"footer-right-copy\">\n			All works licensed under <wbr><a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\" target=\"_blank\">CC BY-SA</a><br/>unless otherwise noted.\n		</div>\n	</div>\n</footer>";
  },"useData":true});



this["webdevBoilerplate"]["header"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header>\n	<h5><a href=\"#\" class=\"modal-about\">about</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"modal-contact\">contact</a></h5>\n	<h1><a href=\"#\">transmote.com</a></h1>\n</header>";
  },"useData":true});



this["webdevBoilerplate"]["main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<header>\n	<h1>"
    + escapeExpression(((helper = (helper = helpers.headerTitle || (depth0 != null ? depth0.headerTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"headerTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n</header>\n<section class='main'>\n	<p>"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n</section>\n<footer>\n	<h3>"
    + escapeExpression(((helper = (helper = helpers.footerTitle || (depth0 != null ? depth0.footerTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"footerTitle","hash":{},"data":data}) : helper)))
    + "</h3>\n</footer>";
},"useData":true});



this["webdevBoilerplate"]["projectThumbList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "		<a href=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), {"name":"concatPath","hash":{},"data":data})))
    + "\" class=\"project-thumb-link\">\n			<div class=\"project-thumb\" data-project=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<div class=\"project-thumb-banner\"></div>\n				<h3 class=\"project-thumb-title\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n";
  stack1 = ((helpers.ifVideo || (depth0 && depth0.ifVideo) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1), {"name":"ifVideo","hash":{},"fn":this.program(2, data),"inverse":this.program(7, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</div>\n		</a>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.poster : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "						<img src=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.poster : stack1), {"name":"concatPath","hash":{},"data":data})))
    + "\" class=\"img-responsive\" />\n";
},"5":function(depth0,helpers,partials,data) {
  return "						<div class=\"img-responsive videoPosterWarn\">\n							If first image is a video, include { 'poster': 'imgpath' }.\n						</div>\n";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					<img src=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.path : stack1), {"name":"concatPath","hash":{},"data":data})))
    + "\" class=\"img-responsive\" />\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"project-thumb-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.projects : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});

return this["webdevBoilerplate"];

});