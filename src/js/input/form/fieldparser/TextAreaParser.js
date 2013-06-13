/**
 * Field processor for text fields. For more details see @link{kat.input.form.fieldparser.FieldParser}
 *
 * @author <a href="mailto:m.dumitru@jacobs-university.de">Alex Dumitru</a>
 * @author <a href="mailto:v.merticari@jacobs-university.de">Vlad Merticariu</a>
 */

FlancheJs.defineClass("kat.input.form.fieldparser.TextAreaParser", {
  implements: [kat.input.form.fieldparser],

  init: function () {

  },

  methods: {
    canParse: function (xmlField) {
      if (xmlField.getAttribute("inputType") == "textarea") {
        return true;
      }
      return false;
    },

    parse: function (xmlField) {
      var ret = this.template
        .replace(/{id}/g, "field-id-" + xmlField.getAttribute("name"))
        .replace(/{label}/g, xmlField.getAttribute("label") ? xmlField.getAttribute("label") : xmlField.getAttribute("name"))
        .replace(/{value}/g, xmlField.getAttribute("defaultValue")  ? xmlField.getAttribute("defaultValue") : "")
        .replace(/{required}/g, xmlField.getAttribute("required") == "true" ? "true" : "false");
      return ret;
    }
  },

  statics: {
    template: "<div class='control-group'><label class='control-label' for='{id}'>{label}</label> <div class='controls'><textarea  id='{id}' required='{required}'>{value}</textarea></div></div>"
  }

});

