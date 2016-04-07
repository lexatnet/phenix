<form id="taxonomyTerm-update-form" class="taxonomyTerm-update-form" action="/administration/taxonomy/term/update/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.taxonomyTerm.id }}">
    <div class="form-group required">
      <label for="taxonomyTermTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyTermTitle" name="title" value="{{ context.taxonomyTerm.title }}">
    </div>
    <div class="form-group required">
      <label for="taxonomyVocabularyId" class="control-label" >{{ 'Vocabulary'|i18n }}</label>
      <select class="form-control" id="taxonomyVocabularyId" name="taxonomyVocabularyId">
      {% for vocabulary in context.taxonomyVocabularies %}
      <option {% if vocabulary.selected %} selected {% endif %} value="{{ vocabulary.id }}">{{ vocabulary.title }}</option>
      {% endfor %}
      </select>
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Update'|i18n }}">
</form>
