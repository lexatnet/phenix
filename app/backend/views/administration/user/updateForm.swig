<form id="user-update-form" class="user-update-form" action="/administration/user/update/" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <input type="hidden" name="id" value="{{ context.user.id }}">
    <div class="form-group required">
      <label for="login" class="control-label" >{{ 'Login'|i18n }}</label>
      <input type="text" class="form-control" id="login" name="login" placeholder="{{ 'Login'|i18n }}" value="{{context.user.login}}">
    </div>
    <div class="form-group required">
      <label for="email" class="control-label" >{{ 'Email address'|i18n }}</label>
      <input type="text" class="form-control" id="email" name="email" placeholder="{{ 'Enter email'|i18n }}" value="{{context.user.email}}">
    </div>
    <div class="form-group required">
      <label for="roles" class="control-label" >{{ 'Roles'|i18n }}</label>
      <select class="form-control" id="roles" name="roles[]" multiple="multiple">
      {% for role in context.roles %}
      <option {% if role.selected %} selected {% endif %} value="{{ role.id }}">{{ role.title }}</option>
      {% endfor %}
      </select>
    </div>
    <div class="form-group">
      <label for="password" class="control-label" >{{ 'Password'|i18n }}</label>
      <input type="password" class="form-control" id="password"  name="password" value="">
    </div>
    <div class="form-group">
      <label for="passwordConfirmation" class="control-label" >{{ 'Password confirmation'|i18n }}</label>
      <input type="password" class="form-control" id="passwordConfirmation" name="passwordConfirmation" value="">
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Update'|i18n }}">
</form>
