<form id="taxonomyVocabulary-create-form" class="taxonomyVocabulary-create-form" action="/administration/taxonomy/vocabulary/create" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <div class="form-group required">
      <label for="taxonomyVocabularyName" class="control-label" >{{ 'Name'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyName" name="name" value="">
    </div>
    <div class="form-group required">
      <label for="taxonomyVocabularyTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyTitle" name="title" value="">
    </div>
    <div class="form-group">
      <label for="taxonomyVocabularyDescription" class="control-label" >{{ 'Description'|i18n }}</label>
      <input type="text" class="form-control" id="taxonomyVocabularyDescription" name="description" value="">
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Create'|i18n }}">
</form>
