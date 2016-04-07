<form id="role-delete-form" class="role-delete-form" action="/administration/role/delete/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.role.id }}">
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Delete'|i18n }}">
</form>
