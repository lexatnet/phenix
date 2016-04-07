<form id="role-create-form" class="role-create-form" action="/administration/role/create" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <div class="form-group required">
      <label for="roleName" class="control-label" >{{ 'Name'|i18n }}</label>
      <input type="text" class="form-control" id="roleName" name="name" value="">
    </div>
    <div class="form-group required">
      <label for="roleTitle" class="control-label" >{{ 'Title'|i18n }}</label>
      <input type="text" class="form-control" id="roleTitle" name="title" value="">
    </div>
    <div class="form-group">
    {% for permission in context.permissions %}
      <div class="permission">
        <input type="checkbox" name="permissions[]" value="{{ permission.id }}" {% if permission.selected %} checked {% endif %} /><span class="permission-title">{{ permission.title }}</span>
      </div>
      {% endfor %}
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Create'|i18n }}">
</form>
