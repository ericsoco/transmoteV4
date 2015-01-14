define(['handlebars'], function(Handlebars) {

this["webdevBoilerplate"] = this["webdevBoilerplate"] || {};

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

return this["webdevBoilerplate"];

});