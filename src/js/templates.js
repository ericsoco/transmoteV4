define(['handlebars'], function(Handlebars) {

this["transmote"] = this["transmote"] || {};

this["transmote"]["footer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<footer>\n	<div id=\"footer-left\">\n		Transmote is Eric Socolofsky.<br/>\n		<p id=\"footer-left-oneline\">\n			<a href=\"#\" data-toggle=\"modal\" data-target=\"#site-modal\" data-src=\"/pages/about.html\" data-class=\"modal-large\">About</a>.&nbsp;&nbsp;<a href=\"#\" data-toggle=\"modal\" data-target=\"#site-modal\" data-src=\"/pages/contact.html\" data-class=\"modal-small\">Contact</a>.&nbsp;&nbsp;<a href=\"http://words.transmote.com/\">Words</a>.&nbsp;&nbsp;<a href=\"http://twitter.com/ericsoco/\">Characters.</a>&nbsp;&nbsp;<a href=\"http://flickr.com/ericsoco/\">Images</a>.&nbsp;&nbsp;<a href=\"http://vimeo.com/ericsoco/\">Videos</a>.\n		</p>\n	</div>\n	<div id=\"footer-right\">\n		<div id=\"footer-right-img\">\n			<a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\" target=\"_blank\"><img alt=\"Creative Commons License\" style=\"border-width:0\" src=\"http://i.creativecommons.org/l/by-sa/3.0/88x31.png\" /></a>\n		</div>\n		<div id=\"footer-right-copy\">\n			All works licensed under <wbr><a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/deed.en_US\" target=\"_blank\">CC BY-SA</a><br/>unless otherwise noted.\n		</div>\n	</div>\n</footer>";
  },"useData":true});



this["transmote"]["header"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header>\n	<h5><a href=\"#\" data-toggle=\"modal\" data-target=\"#site-modal\" data-src=\"/pages/about.html\" data-class=\"modal-large\">about</a><span class='separator'>|</span><a href=\"#\" data-toggle=\"modal\" data-target=\"#site-modal\" data-src=\"/pages/contact.html\" data-class=\"modal-small\">contact</a></h5>\n	<h1><a href=\"/\">transmote.com</a></h1>\n</header>";
  },"useData":true});



this["transmote"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h2 class=\"project-thumb-header\">Featured projects</h2>\n";
  stack1 = this.invokePartial(partials.projectThumbList, '', 'projectThumbList', (depth0 != null ? depth0.featuredProjects : depth0), undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "<h2 class=\"project-thumb-header\">More projects</h2>\n";
  stack1 = this.invokePartial(partials.projectThumbList, '', 'projectThumbList', (depth0 != null ? depth0.moreProjects : depth0), undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});



this["transmote"]["mainContent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"content\"></div>";
  },"useData":true});



this["transmote"]["missingPage"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id='missingPage'>\n	<div class='content'>\n		<img src=\"./img/jasper404.gif\" />\n		<div class=\"copy hidden\">\n			<h1><a href=\"./\" class=\"embiggen\">?</a></h1>\n			<p><a href=\"./\">whoshotwhointhewhutnow?</a></p>\n		</div>\n	</div>\n</div>";
  },"useData":true});



this["transmote"]["projectPage"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "			<li>\n";
  stack1 = ((helpers.ifVideo || (depth0 && depth0.ifVideo) || helperMissing).call(depth0, depth0, {"name":"ifVideo","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(4, data, depths),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</li>\n";
},"2":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					<div class=\"container\">\n						<iframe "
    + escapeExpression(((helpers.createVimeoEmbed || (depth0 && depth0.createVimeoEmbed) || helperMissing).call(depth0, (data && data.index), {"name":"createVimeoEmbed","hash":{},"data":data})))
    + " frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n					</div>\n";
},"4":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "					<a href=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depths[2] != null ? depths[2].id : depths[2]), (depth0 != null ? depth0.path : depth0), {"name":"concatPath","hash":{},"data":data})))
    + "\"><img src=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depths[2] != null ? depths[2].id : depths[2]), (depth0 != null ? depth0.path : depth0), {"name":"concatPath","hash":{},"data":data})))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alt : depth0), {"name":"if","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "/></a>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.caption : depth0), {"name":"if","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" ";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "						<p class=\"caption-title\">";
  stack1 = ((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"caption","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div id=\"project-page\">\n\n	<div id=\"project-header\">\n		<h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n		<h5>"
    + escapeExpression(((helper = (helper = helpers.tagline || (depth0 != null ? depth0.tagline : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tagline","hash":{},"data":data}) : helper)))
    + "<br>"
    + escapeExpression(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"role","hash":{},"data":data}) : helper)))
    + " &ndash; "
    + escapeExpression(((helpers.datestamp || (depth0 && depth0.datestamp) || helperMissing).call(depth0, (depth0 != null ? depth0.date : depth0), {"name":"datestamp","hash":{},"data":data})))
    + "</h5>\n		<div id=\"project-desc\">";
  stack1 = ((helper = (helper = helpers.brief || (depth0 != null ? depth0.brief : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"brief","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n	</div>\n\n	<div id=\"project-body\">\n		<ul class=\"project-media\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.media : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		</ul>\n	</div>\n\n</div>";
},"useData":true,"useDepths":true});



this["transmote"]["projectThumbList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "		<a href=\""
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), {"name":"concatPath","hash":{},"data":data})))
    + "\">\n			<div class=\"project-thumb";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.featured : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-project=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = ((helpers.ifVideo || (depth0 && depth0.ifVideo) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1), {"name":"ifVideo","hash":{},"fn":this.program(4, data),"inverse":this.program(9, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "				<h3 class=\"project-thumb-title\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n			</div>\n		</a>\n";
},"2":function(depth0,helpers,partials,data) {
  return " featured";
  },"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.poster : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "						<div class=\"project-img\" title="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " style=\"background-image: url("
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.poster : stack1), {"name":"concatPath","hash":{},"data":data})))
    + ");\"></div>\n";
},"7":function(depth0,helpers,partials,data) {
  return "						<div class=\"img-responsive videoPosterWarn\">\n							If first image is a video, include { 'poster': 'imgpath' }.\n						</div>\n";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					<div class=\"project-img\" title="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " style=\"background-image: url("
    + escapeExpression(((helpers.concatPath || (depth0 && depth0.concatPath) || helperMissing).call(depth0, "projects", (depth0 != null ? depth0.id : depth0), ((stack1 = ((stack1 = (depth0 != null ? depth0.media : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.path : stack1), {"name":"concatPath","hash":{},"data":data})))
    + ");\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"project-thumb-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.projects : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});



this["transmote"]["siteModal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"site-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"site-modal\" aria-hidden=\"true\">\n	<div class=\"modal-dialog\">\n		<div class=\"modal-content\">\n			<div class=\"modal-body\">\n		      <iframe src=\"\" frameborder=\"0\"></iframe>\n			</div>\n			<button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n		</div>\n	</div>\n</div>";
  },"useData":true});

return this["transmote"];

});