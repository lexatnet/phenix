{% if context['global'] %}
<form id="locale-set-form" class="locale-set-form" action="/locale/set" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="{{ csrf }}">
    <select name="locale">
    {% with context['global'].locales as locales %}
      <option disabled>{{ 'Set Locale'|i18n }}</option>
      {% for locale in locales %}
      <option {% if locale.id === localeId %} selected {% endif %} value="{{ locale.id }}">{{ locale.title }}</option>
      {% endfor %}
    {% endwith %}
   </select>
    <input type="submit" class="btn btn-primary btn-block" value="{{ 'Set'|i18n }}">
</form>
{% endif %}
