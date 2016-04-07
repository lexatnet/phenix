<form id="taxonomyVocabulary-update-form" class="taxonomyVocabulary-update-form" action="/administration/taxonomy/vocabulary/update/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.taxonomyVocabulary.id }}">
    <div class="form-group required">
      <label for="taxonomyVocabularyName" class="control-label" >{{ 'Name'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyName" name="name" value="{{ context.taxonomyVocabulary.name }}">
    </div>
    <div class="form-group required">
      <label for="taxonomyVocabularyTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyTitle" name="title" value="{{ context.taxonomyVocabulary.title }}">
    </div>
    <div class="form-group">
      <label for="taxonomyVocabularyDescription" class="control-label" >{{ 'Description'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyDescription" name="description" value="{{ context.taxonomyVocabulary.description }}">
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Update'|i18n }}">
</form>
