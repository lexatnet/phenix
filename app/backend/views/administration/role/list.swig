{% extends '../../layout.swig' %}

{% block content %}
  {% if context['roleList'].roles %}
    {% with context['roleList'].roles as roles %}
      {% if roles.length > 0 %}
        <ul>
          {% for key, role in roles %}
            <li><a href="/administration/role/update/{{ role.id }}">{{ role.title }}</a><a href="/administration/role/delete/{{ role.id }}">{{ 'Delete'|i18n }}</a></li>
          {% endfor %}
        </ul>
      {% endif %}
    {% endwith %}
  {% endif %}
{% endblock %}
