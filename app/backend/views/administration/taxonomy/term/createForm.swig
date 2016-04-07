<form id="taxonomyTerm-create-form" class="taxonomyTerm-create-form" action="/administration/taxonomy/term/create" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <div class="form-group required">
      <label for="taxonomyTermTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyTermTitle" name="title" value="">
    </div>
    <div class="form-group required">
      <label for="taxonomyVocabularyId" class="control-label" >{{ 'Vocabulary'|i18n }}</label>
      <select class="form-control" id="taxonomyVocabularyId" name="taxonomyVocabularyId" >
      {% for vocabulary in context.taxonomyVocabularies %}
      <option {% if vocabulary.selected %} selected {% endif %} value="{{ vocabulary.id }}">{{ vocabulary.title }}</option>
      {% endfor %}
      </select>
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Create'|i18n }}">
</form>
