{% extends '../../layout.swig' %}

{% block content %}
  {% if context['userList'].users %}
    {% with context['userList'].users as users %}
      {% if users.length > 0 %}
        <ul>
          {% for key, user in users %}
            <li><a href="/administration/user/update/{{ user.id }}">{{ user.login }}</a><a href="/administration/user/{{ user.id }}/delete/">{{ 'Delete'|i18n }}</a></li>
          {% endfor %}
        </ul>
      {% endif %}
    {% endwith %}
  {% endif %}
{% endblock %}
