<form id="taxonomyTerm-delete-form" class="logout navbar-form navbar-left" action="/administration/taxonomy/term/delete" method="post">
  <input type="hidden" name="csrf" value="{{ csrf }}">
  <input type="hidden" name="id" value="{{ context.taxonomyTerm.id }}">
  <input class="btn btn-default" type="submit" name="submit" value="{{ 'Delete'|i18n }}">
</form>
