{% extends '../../layout.swig' %}

{% block content %}
  {% with context['userDeleteForm'] as context %}
  {% include "deleteForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/user-delete.js"></script>
{% endblock %}
