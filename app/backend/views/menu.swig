<nav class="navbar navbar-default">
  <div class="container">
  <div class="navbar-header">
    <a class="navbar-brand" href="/">
      <img alt="stream-at.net" src="/images/logo.png">
    </a>
  </div>
  <ul class="nav navbar-nav">
    <li><a href='/'>{{ __('Home')}}</a></li>
    {% if user %}
    {% else %}
    {% endif %}
  </ul>
  <ul class="nav navbar-nav navbar-right" >
  <li>
    {% include "setLocaleForm.swig" %}
  </li>

  {% if isUserHasPermission('administration dashboard') %}
    <li><a href='/administration/dashboard'>{{ __('Administration dashboard')}}</a></li>
  {% endif %}
  {% if isUserHasPermission('main menu') %}
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ __('Main Menu')}}<span class="caret"></span></a>
      <ul class="dropdown-menu" role="menu">
        <li><a href='/user/profile/{{ user.id }}/view'>{{ __('Profile')}}</a></li>
        <li><a href='/track/upload'>{{ __('Upload track')}}</a></li>
        <li><a href="/track/list">{{__('Track list')}}</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
        <li class="divider"></li>
        <li><a class="logout-link" href="#">{{ 'Logout'|i18n }}</a></li>
      </ul>
    </li>
  {% endif %}
  {% if !isUserAuthenticated() %}
    <li><a class="btn navbar-btn" href='/user/login'>{{ __('Login')}}</a></li>
    <li><a class="btn navbar-btn" href='/user/registration'>{{ __('Register')}}</a></li>
  {% endif %}
  </ul>
  </div>
</nav>
