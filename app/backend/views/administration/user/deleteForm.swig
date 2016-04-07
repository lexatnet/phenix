<form id="user-delete-form" class="user-update-form" action="/administration/user/delete/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.user.id }}">
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Delete'|i18n }}">
</form>
