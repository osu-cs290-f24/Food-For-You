(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recipecardTemplate'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"recipe-card\" category=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"categories") || (depth0 != null ? lookupProperty(depth0,"categories") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"categories","hash":{},"data":data,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":49}}}) : helper)))
    + "\" season=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"season") || (depth0 != null ? lookupProperty(depth0,"season") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"season","hash":{},"data":data,"loc":{"start":{"line":1,"column":59},"end":{"line":1,"column":69}}}) : helper)))
    + "\" rating=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":1,"column":79},"end":{"line":1,"column":89}}}) : helper)))
    + "\">\n    <button class=\"save-button\" type=\"button\">SAVE</button>\n    <div class = \"img-container\">\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"imgURL") || (depth0 != null ? lookupProperty(depth0,"imgURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imgURL","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":28}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":35},"end":{"line":4,"column":43}}}) : helper)))
    + "\">\n    </div>\n    <a class = \"link-container\"href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":6,"column":37},"end":{"line":6,"column":45}}}) : helper)))
    + "\" target=\"_blank\">\n        <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":20}}}) : helper)))
    + "</h2>\n    </a>\n    <p class = \"rating-container\">Rating: "
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":9,"column":42},"end":{"line":9,"column":52}}}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});
})();