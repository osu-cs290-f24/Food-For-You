(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recipe-cardTemplate'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"recipe-card\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"categories") || (depth0 != null ? lookupProperty(depth0,"categories") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"categories","hash":{},"data":data,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":45}}}) : helper)))
    + "\" season=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"season") || (depth0 != null ? lookupProperty(depth0,"season") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"season","hash":{},"data":data,"loc":{"start":{"line":1,"column":55},"end":{"line":1,"column":65}}}) : helper)))
    + "\" rating=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":1,"column":75},"end":{"line":1,"column":85}}}) : helper)))
    + "\">\r\n    <button class=\"save-button\" type=\"button\">SAVE</button>\r\n    <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"imgURL") || (depth0 != null ? lookupProperty(depth0,"imgURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imgURL","hash":{},"data":data,"loc":{"start":{"line":3,"column":14},"end":{"line":3,"column":24}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":31},"end":{"line":3,"column":39}}}) : helper)))
    + "\">\r\n    <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link-to-recipe") || (depth0 != null ? lookupProperty(depth0,"link-to-recipe") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link-to-recipe","hash":{},"data":data,"loc":{"start":{"line":4,"column":13},"end":{"line":4,"column":31}}}) : helper)))
    + "\" target=\"_blank\">\r\n        <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":20}}}) : helper)))
    + "</h2>\r\n    </a>\r\n    <p>Rating: "
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":25}}}) : helper)))
    + "/5</p>\r\n</div>\r\n";
},"useData":true});
})();