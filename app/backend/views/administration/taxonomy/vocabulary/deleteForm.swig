<form id="taxonomyVocabulary-delete-form" class="logout navbar-form navbar-left" action="/administration/taxonomy/vocabulary/delete" method="post">
  <input type="hidden" name="csrf" value="{{ csrf }}">
  <input type="hidden" name="id" value="{{ context.taxonomyVocabulary.id }}">
  <input class="btn btn-default" type="submit" name="submit" value="{{ 'Delete'|i18n }}">
</form>
