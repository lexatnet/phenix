<form id="role-update-form" class="role-update-form" action="/administration/role/update/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.role.id }}">
    <div class="form-group required">
      <label for="roleName" class="control-label" >{{ 'Name'|i18n }}</label>
      <input type="text" class="form-control" id="roleName" name="name" value="{{ context.role.name }}">
    </div>
    <div class="form-group required">
      <label for="roleTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="roleTitle" name="title" value="{{ context.role.title }}">
    </div>
    <div class="form-group">
    {% for permission in context.permissions %}
      <div class="permission">
        <input type="checkbox" name="permissions[]" value="{{ permission.id }}" {% if permission.selected %} checked {% endif %} /><span class="permission-title">{{ permission.title }}</span>
      </div>
      {% endfor %}
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Update'|i18n }}">
</form>
