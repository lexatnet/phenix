<form id="user-create-form" class="user-create-form" action="/administration/user/create" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <div class="form-group required">
      <label for="login" class="control-label" >{{ 'Login'|i18n }}</label>
      <input type="text" class="form-control" id="login" name="login" placeholder="{{ 'Login'|i18n }}">
    </div>
    <div class="form-group required">
      <label for="email" class="control-label" >{{ 'Email addres'|i18n }}</label>
      <input type="text" class="form-control" id="email" name="email" placeholder="{{ 'Enter email'|i18n }}">
    </div>
    <div class="form-group required">
      <label for="roles" class="control-label" >{{ 'Roles'|i18n }}</label>
      <select class="form-control" id="roles" name="roles[]" multiple="multiple">
      {% for role in context.roles %}
      <option {% if role.selected %} selected {% endif %} value="{{ role.id }}">{{ role.title }}</option>
      {% endfor %}
      </select>
    </div>
    <div class="form-group required">
      <label for="password" class="control-label" >{{ 'Password'|i18n }}</label>
      <input type="password" class="form-control" id="password"  name="password" value="" placeholder="{{ 'Password'|i18n }}">
    </div>
    <div class="form-group required">
      <label for="passwordConfirmation" class="control-label" >{{ 'Password confirmation'|i18n }}</label>
      <input type="password" class="form-control" id="passwordConfirmation" name="passwordConfirmation" value="" placeholder="{{ 'Password confirmation'|i18n }}">
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Create'|i18n }}">
</form>
