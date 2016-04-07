{% extends '../layout.swig' %}

{% block content %}
  <p>This is administration dashboard page.</p>
  {% if isUserHasPermission('admin menu') %}
    {% include "./administrationMenu.swig" %}
  {% endif %}
{% endblock %}
