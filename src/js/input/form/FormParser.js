/**
 * A FormParser object takes an annotation ontology form definition as an xml node and returns
 * an HTML string form that can be added inside a document
 *
 * @author <a href="mailto:m.dumitru@jacobs-university.de">Alex Dumitru</a>
 * @author <a href="mailto:v.merticari@jacobs-university.de">Vlad Merticariu</a>
 */

FlancheJs.defineClass("kat.input.form.FormParser", {

  /**
   * Constructor for the class
   * @param {kat.util.XMLDoc} annotationDefinition an annotation:input xml element from which the form should be extracted
   * @param {Function} submitCallback function to be called when the annotation submit button is clicked
   */
  init: function (annotationDefinition, submitCallback) {
    this._annotationDefinition = annotationDefinition;
    this._submitCallback = submitCallback;
  },

  methods: {
    /**
     * Parses the annotation:input and return an html form as string
     */
    parse: function () {
      var fields = this._annotationDefinition.getChildren();
      var fieldsHtml = "\n";
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].getXmlDoc().nodeType == Node.ELEMENT_NODE) {
          fieldsHtml += this._parseField(fields[i]) + "\n";
          this._fieldNames.push(fields[i].getAttribute("name"));
        }
      }
      return this.KFormTemplate.replace("{fields}", fieldsHtml);
    },

    getFormValues: function () {
      var values = {};
      for (var i = 0; i < this._fieldNames; i++) {
        var currentId = this._fieldNames[i];
        values[currentId] = jQuery("#" + kat.Constants.Form.FieldPrefix + currentId).val();
      }
      return values;
    }

  },

  internals: {
    annotationDefinition: null,
    submitCallback      : null,
    fieldNames          : [],

    parseField: function (annotationField) {
      var registry = new kat.input.form.FieldParserRegistry();
      return registry.getparser(annotationField).parse(annotationField);
    }
  },

  statics: {
    KFormTemplate: '<form class="form-horizontal">{fields} <div class="control-group"><div class="controls"><button class="btn" id="form-annotation-submit">Annotate</button></div></div></form>'
  }

})
